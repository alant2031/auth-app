'use client';

import { userCurrentRole } from '@/hooks/user-current-role';
import { FormError } from '../form-error';
import { UserRole } from '@prisma/client';

interface RoleGateProps {
	children: React.ReactNode;
	allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
	const role = userCurrentRole();
	if (role !== allowedRole) {
		return (
			<FormError message="Sua conta não possui poderes para visualizar aqui." />
		);
	}

	return <>{children}</>;
};
