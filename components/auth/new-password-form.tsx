'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';
import { NewPasswordSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CardWrapper } from './card-wrapper';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { newPassword } from '@/actions/new-password';

export const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: { password: '' },
	});

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setError(undefined);
		setSuccess(undefined);

		startTransition(() => {
			newPassword(values, token)
				.then((data) => {
					setError(data?.error);
					setSuccess(data?.success);
				})
				.finally(() => {
					form.reset();
				});
		});
	};
	return (
		<CardWrapper
			headerLabel="Informe sua nova senha"
			backButtonLabel="Voltar para login"
			backButtonHref="/auth/login"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											{...field}
											placeholder="******"
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit" className="w-full">
						Confirma nova senha
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
