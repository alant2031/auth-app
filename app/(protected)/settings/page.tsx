import React from 'react';
import { auth, signOut } from '@/auth';

async function SettingsPage() {
	const session = await auth();
	return (
		<div>
			<p>{JSON.stringify(session)}</p>
			<form
				action={async () => {
					'use server';

					await signOut();
				}}
			>
				<button type="submit">Sair</button>
			</form>
		</div>
	);
}

export default SettingsPage;
