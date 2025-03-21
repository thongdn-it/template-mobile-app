import { useGetListCoffeeQuery } from '@/src/data/queries';

export const useHomeController = () => {
  const { data, isLoading, error } = useGetListCoffeeQuery();

  return {
    data: data?.data,
    error: error,
    isLoading,
  };
};
