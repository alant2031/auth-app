'use server';

import { LoginSchema } from '@/schemas';
import * as z from 'zod';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validateFields = LoginSchema.safeParse(values);
	if (!validateFields.success) {
		return { error: 'Campos inválidos' };
	}

	const { email, password } = validateFields.data;

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
