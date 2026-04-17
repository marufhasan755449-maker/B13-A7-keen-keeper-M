import { createContext, useContext, useState } from "react";

const TimelineContext = createContext();

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([]);

  const addEntry = (friendName, type) => {
    const newEntry = {
      id: Date.now(),
      friendName,
      type,
      title: `${type} with ${friendName}`,
      date: new Date().toISOString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}
