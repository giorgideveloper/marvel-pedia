'use client';
import CharacterCard from '@/components/CharacterCard';
import { Character } from '@/types/marvels';
import { searchCharacters } from '@/utils/api';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import LoadingBars from '../../components/LoadingBars';

const SearchPage: FC = () => {
	const searchParams = useSearchParams();
	const querySearch = searchParams.get('query');
	const [characters, setCharacters] = useState<Character[]>([]);
	const [isLodaing, setIsLodaing] = useState<boolean>(false);

	console.log(characters);

	useEffect(() => {
		const fetchData = async () => {
			setIsLodaing(true);
			try {
				const data = await searchCharacters(querySearch);
				setCharacters(data.results);
			} catch (error) {
				console.error(error);
			}
			setIsLodaing(false);
		};
		if (querySearch) {
			fetchData();
		}
	}, [querySearch]);
	return (
		<div className='container text-center mt-10'>
			<h1 className='text-3xl font-bold'>
				Search for <span>&quot;{querySearch}&quot;</span>
			</h1>
			{isLodaing ? (
				<div className='mt-10'>
					<LoadingBars />
				</div>
			) : (
				<div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-10'>
					{characters.map(character => (
						<CharacterCard key={character.id} character={character} />
					))}
				</div>
			)}
		</div>
	);
};

export default SearchPage;
