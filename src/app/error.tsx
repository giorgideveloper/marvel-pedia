'use client';
import { FC } from 'react';

interface errorProps {
	error: Error;
	reset: () => void;
}

const error: FC<errorProps> = ({ error, reset }) => {
	return (
		<div className='flex flex-col gap6 items-center justify-center h-screen'>
			<h2>Something went wrong!</h2>
			<button onClick={() => reset()} className='btn'>
				Try Again
			</button>
		</div>
	);
};

export default error;
