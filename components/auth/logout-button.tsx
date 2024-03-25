'use client';

import { logout } from '@/actions/logout';
import { ReactNode } from 'react';

interface ILogoutButton {
	children: ReactNode;
}

export const LogoutButton = ({ children }: ILogoutButton) => {
	const handleClick = () => logout();
	return (
		<span onClick={handleClick} className="cursor-pointer">
			{children}
		</span>
	);
};
