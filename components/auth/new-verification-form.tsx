'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { newVerification } from '@/actions/new-verification';
import { FormSuccess } from '../form-success';
import { FormError } from '../form-error';

export const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const onSubmit = useCallback(() => {
		if (success || error) return;
		if (!token) {
			setError('Token inválido!');
			return;
		}
		newVerification(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => setError('Erro interno. Tente novamente.'));
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);
	return (
		<CardWrapper
			headerLabel="Confirmando sua identidade"
			backButtonLabel="Voltar para login"
			backButtonHref="/auth/login"
		>
			<div className="flex justify-center items-center w-full">
				{!success && !error && <BeatLoader />}
				<FormSuccess message={success} />
				{!success && <FormError message={error} />}
			</div>
		</CardWrapper>
	);
};
