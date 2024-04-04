import { ExtendedUser } from '@/next-auth';
import { Card, CardContent, CardHeader } from './ui/card';

interface UserInfoProps {
	user?: ExtendedUser;
	label: string;
}

export const UserInfo = ({ label, user }: UserInfoProps) => {
	return (
		<Card className="w-[600px] shadow-md">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">{label}</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">ID:</p>
					<p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.id}
					</p>
				</div>
				<div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">Nome:</p>
					<p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.name}
					</p>
				</div>
				<div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">Email:</p>
					<p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.email}
					</p>
				</div>
				<div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">Perfil:</p>
					<p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.role}
					</p>
				</div>
				<div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">2FA:</p>
					<p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.is2FA ? '🟢' : '🔴'}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};
