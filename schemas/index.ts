import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().min(1, { message: 'Senha requerida' }),
	code: z.optional(z.string()),
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6, { message: 'Senha deve ter 6+ caracteres' }),
});

export const ResetSchema = z.object({
	email: z.string().email({ message: 'Email inválido' }),
});

export const RegisterSchema = z.object({
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().min(6, { message: 'Senha deve ter 4+ caracteres' }),
	name: z.string().min(8, {
		message: 'Nome precisa de 6+ caracteres',
	}),
});
