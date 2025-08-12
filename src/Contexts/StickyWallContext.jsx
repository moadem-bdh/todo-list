import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";
const StickyContext = createContext([]);
export const StickyWallprovider = ({ children }) => {
  const [storedValues, setStoredValues] = useLocalStorage("sticky");
  const [stickyWalls, setStickyWalls] = useState(storedValues);

  // Save to localStorage when stickyWalls changes
  useEffect(() => {
    setStoredValues(stickyWalls);
  }, [stickyWalls, setStoredValues]);

  return (
    <StickyContext.Provider value={{ stickyWalls, setStickyWalls }}>
      {children}
    </StickyContext.Provider>
  );
};

// eslint-disable-next-line
export const useStickyWalls = () => useContext(StickyContext);
