import React from 'react';
import Navbar from './_components/navbar';

interface IProps {
	children: React.ReactNode;
}

function ProtectedLayout({ children }: IProps) {
	return (
		<div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-sky-500">
			<Navbar />
			{children}
		</div>
	);
}

export default ProtectedLayout;
