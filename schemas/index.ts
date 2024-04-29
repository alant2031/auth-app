import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const SettingsSchema = z
	.object({
		name: z.string().optional(),
		isTwoFactorEnabled: z.boolean().optional(),
		role: z.enum([UserRole.ADMIN, UserRole.MEMBER]),
		email: z.string().email().optional(),
		password: z
			.string()
			.min(6, { message: 'É necessário 6+ caracteres' })
			.optional(),
		newPassword: z
			.string()
			.min(6, { message: 'É necessário 6+ caracteres' })
			.optional(),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) return false;
			if (data.newPassword && !data.password) return false;
			return true;
		},
		{
			message: 'Nova senha necessária',
			path: ['newPassword'],
		},
	);

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
