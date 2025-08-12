import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";

const TasksContext = createContext([]);

export const EventsProvider = ({ children }) => {
  const [storedValues, setStoredValues] = useLocalStorage("events");
  const [eventsAndTasks, setEventsAndTasks] = useState(storedValues);

  // Sync eventsAndTasks changes back to localStorage
  useEffect(() => {
    setStoredValues(eventsAndTasks);
  }, [eventsAndTasks, setStoredValues]);

  return (
    <TasksContext.Provider value={{ eventsAndTasks, setEventsAndTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

// eslint-disable-next-line
export const useEventsAndTasks = () => useContext(TasksContext);
