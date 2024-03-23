'use server';

import { LoginSchema } from '@/schemas';
import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import {
	generateVerificationToken,
	generatePasswordResetToken,
	generateTwoFactorToken,
} from '@/lib/tokens';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/data/user';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validateFields = LoginSchema.safeParse(values);
	if (!validateFields.success) {
		return { error: 'Campos inválidos!' };
	}

	const { email, password, code } = validateFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Ops! Parece que esse email não está cadastrado.' };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email,
		);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		);

		return { success: 'Email de confirmação enviado. Verifique' };
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
			if (!twoFactorToken) {
				return { error: 'Código inválido!' };
			}

			if (twoFactorToken.token !== code) {
				return { error: 'Código inválido!' };
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date();
			if (hasExpired) {
				return { error: 'O código está fora de validade!' };
			}

			await db.twoFactorToken.delete({
				where: { id: twoFactorToken.id },
			});

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id,
			);

			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id },
				});
			}

			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
			return { twoFactor: true };
		}
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (err) {
		if (err instanceof AuthError) {
			switch (err.type) {
				case 'CredentialsSignin':
					return { error: 'Credenciais Inválidas!' };
				default:
					return { error: 'Erro interno. Tente novamente.' };
			}
		}

		throw err;
	}
};
