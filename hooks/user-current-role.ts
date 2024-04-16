import { useSession } from 'next-auth/react';

export const userCurrentRole = () => {
	const session = useSession();

	return session.data?.user.role;
};
