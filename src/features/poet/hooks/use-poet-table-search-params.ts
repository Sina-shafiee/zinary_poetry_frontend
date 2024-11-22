import { useSearchParams } from 'react-router-dom';

export const usePoetTableSearchParams = () => {
  const [searchParams] = useSearchParams();

  return {
    page: Number(searchParams.get('page')),
    perPage: Number(searchParams.get('perPage')),
    sort: searchParams.get('sort') ?? undefined,
    searchQuery: searchParams.get('query') ?? undefined,
  };
};
