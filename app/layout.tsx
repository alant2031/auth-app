import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '🔐 Auth App',
	description: 'um serviço de autenticação simples',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang="pt-br">
				<body className={nunito.className}>
					<Toaster />
					{children}
				</body>
			</html>
		</SessionProvider>
	);
}
