import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().min(1, { message: 'Senha requerida' }),
});
export const RegisterSchema = z.object({
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().min(6, { message: 'Senha precisa de 4+ caracteres' }),
	name: z.string().min(8, {
		message: 'Nome precisa de 6+ caracteres',
	}),
});
