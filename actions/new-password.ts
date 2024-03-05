'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';

export const newPassword = async (
	values: z.infer<typeof NewPasswordSchema>,
	token: string | null,
) => {
	if (!token) {
		return { error: 'Token não encontrado!' };
	}

	const validatedFields = NewPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Campos inválidos!' };
	}

	const { password } = validatedFields.data;
	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) {
		return { error: 'Token não encontrado' };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: 'O token está fora de validade!' };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: 'Email não encontrado!' };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await db.user.update({
			where: { id: existingUser.id },
			data: { password: hashedPassword },
		});

		await db.passwordResetToken.delete({ where: { id: existingToken.id } });
		return { success: 'Nova senha atualizada!' };
	} catch {
		return { error: 'Erro interno. Tente Novamente.' };
	}
};
