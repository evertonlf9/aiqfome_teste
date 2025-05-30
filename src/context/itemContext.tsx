"use client";

import { createContext, useContext, useState } from "react";

type ItemContextType = {
  selectedSize: any | null;
  setSelectedSize: (size: any) => void;
  selectedAccompaniments: number[];
  setSelectedAccompaniments: (accompaniments: any) => void;
  drinkQuantities: { [key: number]: number };
  setDrinkQuantities: (quantities: any) => void;
  selectedCutlery: any;
  setSelectedCutlery: (cutlery: any) => void;
  selectedExtras: number[];
  setSelectedExtras: (extras: any) => void;
  total: number;
  setTtotal: (total: number) => void;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedAccompaniments, setSelectedAccompaniments] = useState<
    number[]
  >([]);
  const [drinkQuantities, setDrinkQuantities] = useState<{
    [key: number]: number;
  }>({});
  const [selectedCutlery, setSelectedCutlery] = useState<any>(null);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [total, setTtotal] = useState<number>(0.00);

  return (
    <ItemContext.Provider
      value={{
        selectedSize,
        setSelectedSize,
        selectedAccompaniments,
        setSelectedAccompaniments,
        drinkQuantities,
        setDrinkQuantities,
        selectedCutlery,
        setSelectedCutlery,
        selectedExtras,
        setSelectedExtras,
        total, 
        setTtotal
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
