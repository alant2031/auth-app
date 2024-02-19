'use server';

import { LoginSchema } from '@/schemas';
import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/data/user';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validateFields = LoginSchema.safeParse(values);
	if (!validateFields.success) {
		return { error: 'Campos inválidos' };
	}

	const { email, password } = validateFields.data;

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
