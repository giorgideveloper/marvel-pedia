import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex items-center justify-center'>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link className='loading loading-bars loading-md' href='/'>
				Go Back
			</Link>
		</div>
	);
}
