'use client';

import React from 'react';
import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/use-current-user';

function SettingsPage() {
	const user = useCurrentUser();
	return (
		<div className="bg-white p-10 rounded">
			<button onClick={logout} type="button">
				Sair
			</button>
		</div>
	);
}

export default SettingsPage;
