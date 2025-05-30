"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  filter: string;
  setFilter: (name: string) => void;
  hiddenFilter: boolean; 
  handleHiddenFilterChange: (hidden: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<string>("");
  const [hiddenFilter, setHiddenFilter] = useState<boolean>(false);

  const handleHiddenFilterChange = (status: boolean) => {
    setHiddenFilter(status);
    localStorage.setItem("hiddenFilter", JSON.stringify({ hidden: status }));
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const status = JSON.parse(localStorage.getItem("hiddenFilter") || "{}");
      setHiddenFilter(status?.hidden || false);
    }
    
  })

  return (
    <AppContext.Provider value={{ filter, setFilter, hiddenFilter, handleHiddenFilterChange }}>
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