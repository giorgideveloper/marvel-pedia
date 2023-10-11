import { CharacterDataWrapper } from '@/types/marvels';
import md5 from 'md5';

const API_BASE_URL = 'https://gateway.marvel.com/v1/public';
const API_PUBLIC_KEY = 'f94e3ae7ed67500f335dc3c0d5a3d85c';
const API_PRIVATE_KEY = 'b7f84ad5c984ce0b76e8207924169f4771b668dd';

const getTimeStamp = () => Date.now().toString();
const getHash = (timeStamp: string) =>
	md5(timeStamp + API_PRIVATE_KEY + API_PUBLIC_KEY);

const timeStamp = getTimeStamp();
const hash = getHash(timeStamp);
const query = `ts=${timeStamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

const handleResponse = async <T>(response: Response) => {
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data = await response.json();
	return data.data as T;
};

export const getCharacters = async (): Promise<CharacterDataWrapper> => {
	const url = `${API_BASE_URL}/characters?${query}`;
	const response = await fetch(url);
	return handleResponse<CharacterDataWrapper>(response);
};

export const detailCharacter = async (
	characterId: string
): Promise<CharacterDataWrapper> => {
	const url = `${API_BASE_URL}/characters/${characterId}?${query}`;
	const response = await fetch(url);
	return handleResponse<CharacterDataWrapper>(response);
};

export const searchCharacters = async (
	querySearch: string | null
): Promise<CharacterDataWrapper> => {
	const url = `${API_BASE_URL}/characters?nameStartsWith=${querySearch}&limit=99&${query}`;
	const response = await fetch(url);
	return handleResponse<CharacterDataWrapper>(response);
};
