'use client';

import React from 'react';
import { BounceLoader } from 'react-spinners';

function Loading() {
	return (
		<div className="flex justify-center items-center h-full bg-sky-500">
			<p className="animate-pulse opacity-5 text-4xl font-bold">
				Carregando . . .
			</p>
		</div>
	);
}

export default Loading;
