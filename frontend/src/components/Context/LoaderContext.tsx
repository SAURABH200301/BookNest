import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type LoaderContextType = {
  showLoader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
};

interface LoaderProviderProps {
  children: React.ReactNode;
}

const LoaderContext = createContext<LoaderContextType>({
  showLoader: false,
  setLoader: () => {},
});

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [showLoader, setLoader] = useState(false);
  
  return (
    <LoaderContext.Provider value={{ showLoader, setLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
