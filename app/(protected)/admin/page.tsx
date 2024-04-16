'use client';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { userCurrentRole } from '@/hooks/user-current-role';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { UserRole } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { admin } from '@/actions/admin';

function AdminPage() {
	const onServerActionClick = () => {
		admin().then((data) => {
			if (data.error) {
				toast.error(data.error);
			} else toast.success(data.success);
		});
	};
	const onApiRouteClick = () => {
		fetch('/api/admin').then((resp) => {
			if (resp.ok) {
				toast.success('Permissão OK!');
			} else {
				toast.error('Não permitido!');
			}
		});
	};
	return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">🔑 Admin</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<RoleGate allowedRole={UserRole.ADMIN}>
					<FormSuccess message="Esta conta possui poderes." />
				</RoleGate>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium" onClick={onApiRouteClick}>
						Admin-only API Route
					</p>
					<Button onClick={onApiRouteClick}>Click to test</Button>
				</div>

				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only Server Action</p>
					<Button onClick={onServerActionClick}>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	);
}

export default AdminPage;
