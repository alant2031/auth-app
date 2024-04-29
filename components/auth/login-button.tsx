'use client';
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { LoginForm } from './login-form';

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: 'modal' | 'redirect';
	asChild?: boolean;
}

export const LoginButton = ({
	children,
	mode = 'redirect',
	asChild,
}: LoginButtonProps) => {
	const router = useRouter();
	const handleClick = () => {
		router.push('/auth/login');
	};

	if (mode == 'modal') {
		return (
			<Dialog>
				<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
				<DialogContent className="p-0 w-auto bg-transparent border-none">
					<LoginForm />
				</DialogContent>
			</Dialog>
		);
	}
	return (
		<span onClick={handleClick} className="cursor-pointer">
			{children}
		</span>
	);
};
