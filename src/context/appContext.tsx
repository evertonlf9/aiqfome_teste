"use client";

import { createContext, useContext, useState } from "react";

type AppContextType = {
  filter: string;
  setFilter: (name: string) => void;
  hiddenFilter: boolean; 
  setHiddenFilter: (hidden: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<string>("");
  const [hiddenFilter, setHiddenFilter] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ filter, setFilter, hiddenFilter, setHiddenFilter }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};