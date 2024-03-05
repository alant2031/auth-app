'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

export const newVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);
	if (!existingToken) {
		return { error: 'Token não encontrado!' };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: 'O token está fora de validade!' };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: 'Email não encontrado!' };
	}
	try {
		await db.user.update({
			where: {
				id: existingUser.id,
			},
			data: {
				emailVerified: new Date(),
				email: existingToken.email,
			},
		});

		await db.verificationToken.delete({ where: { id: existingToken.id } });
		return { success: 'Email confirmado 😀' };
	} catch {
		return { error: 'Erro interno. Tente Novamente.' };
	}
};
