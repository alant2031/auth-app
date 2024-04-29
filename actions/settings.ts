'use server';
import * as z from 'zod';
import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { error } from 'console';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await currentUser();
	if (!user) {
		return { error: 'Não autorizado' };
	}

	const dbUser = await getUserById(user.id!);

	await db.user.update({
		where: { id: dbUser?.id },
		data: {
			...values,
		},
	});

	return {
		success: 'Definições atualizadas',
	};
};
