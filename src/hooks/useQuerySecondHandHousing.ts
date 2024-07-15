import { create } from "zustand";
import { list, QuerySecondHandHousing } from "../api/SecondHandHousing";
import { useQuery } from "react-query";

const useParams = create<QuerySecondHandHousing>(() => ({
  page_index: 1,
  page_size: 10,
}));

export function useQuerySecondHandHousing() {
  const params = useParams();
  const { data: result, isLoading } = useQuery(
    ["QuerySecondHandHousing", params],
    () => list(params)
  );

  return {
    result,
    isLoading,
    setQuery: useParams.setState,
  };
}
