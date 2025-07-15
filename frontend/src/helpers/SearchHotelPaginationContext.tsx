import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface Pagination {
  startIndex: number;
  endIndex: number;
}
export interface HotelPaginationType {
  pagination: Pagination;
  loadMore: boolean;
  totalItems: number;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  setTotalItems: Dispatch<SetStateAction<number>>;
  setLoadMore: Dispatch<SetStateAction<boolean>>;
}

interface HotelPaginationProviderProps {
  children: React.ReactNode;
}

const HotelPaginationContext = createContext<HotelPaginationType>({
  pagination: {
    startIndex: 0,
    endIndex: 5,
  },
  loadMore: false,
  totalItems: 1,
  setPagination: () => {},
  setTotalItems: () => {},
  setLoadMore: () => {},
});

export const HotelPaginationProvider: React.FC<
  HotelPaginationProviderProps
> = ({ children }) => {
  const [pagination, setPagination] = useState<Pagination>({
    startIndex: 0,
    endIndex: 5,
  });
  const [totalItems, setTotalItems] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  useEffect(() => {
    setLoadMore(pagination.endIndex <= totalItems);
  }, [pagination, totalItems]);
  return (
    <HotelPaginationContext.Provider
      value={{
        pagination,
        loadMore,
        setPagination,
        setTotalItems,
        totalItems,
        setLoadMore,
      }}
    >
      {children}
    </HotelPaginationContext.Provider>
  );
};

export const useHotelPagination = () => useContext(HotelPaginationContext);
