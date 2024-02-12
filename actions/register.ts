'use server';

import { RegisterSchema } from '@/schemas';
import * as z from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validateFields = RegisterSchema.safeParse(values);
	if (!validateFields.success) {
		return { error: 'Campos inválidos' };
	}

	return {
		success: 'Email enviado',
	};
};
