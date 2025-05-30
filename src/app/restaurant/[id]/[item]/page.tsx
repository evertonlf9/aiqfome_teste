"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Input } from "antd";

import MenuOptions from "@/components/menuOptions";
import { useItemContext } from "@/context/itemContext";
import { redirect } from "next/navigation";
import AddOrSubItem from "@/components/addOrSubItem";

const { TextArea } = Input;

export default function ItemDetail() {
  const {
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
    setTtotal,
  } = useItemContext();

  const [data, setData] = useState<any>({});
  const [itemData, setItemData] = useState<any>({
    id: 1,
    name: "Ceviche de salmão",
    basePrice: 19.9,
    quantity: 1,
    description: "salmão temperado com limão, cebola e pimenta",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(JSON.parse(localStorage.getItem("data") || "{}"));
    }
  }, []);

  const handlerSelectedSize = (size: any) => {
    setSelectedSize(size);
    setTtotal(total + (itemData.quantity * (size.price - (selectedSize?.price || 0))));
  };

  const handlerSelectedCutlery = (cutlery: any) => {
    if (selectedCutlery?.price) {
      setTtotal(total - selectedCutlery?.price);
    }
    setSelectedCutlery(cutlery);
    if (cutlery.price) {
      setTtotal(total + cutlery.price);
    }
  };

  const handleDrinkQuantityChange = (drink: any, increment: boolean) => {
    const drinkId = drink.id;
    setDrinkQuantities((prev: any) => ({
      ...prev,
      [drinkId]: Math.max(0, (prev[drinkId] || 0) + (increment ? 1 : -1)),
    }));

    if (increment) {
      setTtotal(total + drink.price);
    } else {
      setTtotal(total - drink.price);
    }
  };

  const handlerSelectedExtras = (extra: any) => {
    if (selectedExtras.includes(extra.id)) {
      setSelectedExtras((prev: any[]) =>
        prev.filter((id: any) => id !== extra.id)
      );
      setTtotal(total - extra.price);
    } else if (selectedExtras.length < 3) {
      setSelectedExtras((prev: any) => [...prev, extra.id]);
      setTtotal(total + extra.price);
    }
  };

  const handlerSelectedAccompaniments = (accompaniment: any) => {
    if (selectedAccompaniments.includes(accompaniment.id)) {
      setSelectedAccompaniments((prev: any) =>
        prev.filter((id: any) => id !== accompaniment.id)
      );
    } else if (selectedAccompaniments.length < 2) {
      setSelectedAccompaniments((prev: any) => [...prev, accompaniment.id]);
    }
  };

  const handleQuantityChange = (id: number, increment: boolean) => {
    const value = selectedSize?.price || itemData.basePrice;
    if (increment) {
      itemData.quantity += 1;
      setTtotal(total + value);
    } else if (itemData.quantity > 0) {
      itemData.quantity -= 1;
      setTtotal(total - value);
    }

    setItemData({ ...itemData });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Image
        src="/prato.png"
        alt="Prato"
        className="position-relative"
        fill
        style={{ objectFit: "contain" }}
      />
      <div className="pl-4 pr-4">
        <div className="max-w-2xl  bg-white pl-2 pt-1 space-y-2">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-medium text-[#1a1a1a]">
              {itemData.name}
            </h1>
          </div>
          <span className="font-bold">
            a partir de{" "}
            <span className="text-[#9333EA]">
              R$ {itemData.basePrice.toFixed(2)}
            </span>
          </span>
          <p className="text-sm text-[#666666] m-0">{itemData.description}</p>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-base font-medium text-[#393A3C] font-bold">
              quantos?
            </h2>
            {!selectedSize && (
              <button className="mt-4 bg-[#6D6F73] text-white py-2 px-4 rounded-md border-none">
                adicionar
              </button>
            )}

            {selectedSize && (
              <AddOrSubItem
                item={itemData}
                handleQuantityChange={handleQuantityChange}
              />
            )}
          </div>
          <span className="text-[#1a1a1a]">
            total{" "}
            <span className="text-[#393A3C] font-bold">
              R$ {total.toFixed(2)}
            </span>
          </span>
        </div>

        <MenuOptions isRequired title="qual o tamanho?" description="escolha 1">
          {data?.sizes?.map((size: any) => (
            <label
              key={size.id}
              className="flex items-center justify-between pl-2 pb-2 border rounded-md"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="size"
                  checked={selectedSize?.id === size.id}
                  onChange={() => handlerSelectedSize(size)}
                  className="form-radio text-[#9333EA]"
                />
                <span className="text-[#1a1a1a]">{size.name}</span>
              </div>
              <span className="text-[#9333EA] font-bold">
                R$ {size.price.toFixed(2)}
              </span>
            </label>
          ))}
        </MenuOptions>

        <MenuOptions
          isRequired
          title="acompanhamentos"
          description="escolha até 2"
        >
          {data?.accompaniments?.map((accompaniment: any) => (
            <label
              key={accompaniment.id}
              className="flex items-center gap-2 pl-2 pb-2 border rounded-md custom-checkbox"
            >
              <input
                type="checkbox"
                checked={selectedAccompaniments.includes(accompaniment.id)}
                onChange={() => handlerSelectedAccompaniments(accompaniment)}
                className="form-checkbox text-[#9333EA]"
              />
              <span className="text-[#1a1a1a]">{accompaniment.name}</span>
            </label>
          ))}
        </MenuOptions>

        <MenuOptions title="vai querer bebida?" description="escolha até 5">
          {data?.drinks?.map((drink: any) => (
            <div
              key={drink.id}
              className="flex items-center justify-between pl-2 pb-2 border rounded-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDrinkQuantityChange(drink, false)}
                    
                    className={
                      drinkQuantities[drink.id] > 0
                        ? "button-default button-plus"
                        : "button-default"
                    }
                  >
                    <AiOutlineMinus className="svg-default" />
                  </button>
                  <span className="w-4 text-center position-relative" style={{top: "-3px"}}>
                    {drinkQuantities[drink.id] || 0}
                  </span>
                  <button
                    onClick={() => handleDrinkQuantityChange(drink, true)}
                    className="button-plus button-default"
                  >
                    <AiOutlinePlus className="svg-default" />
                  </button>
                </div>
                <span className="text-[#1a1a1a]">{drink.name}</span>
              </div>
              <span className="text-[#9333EA] font-bold">
                +R$ {drink.price.toFixed(2)}
              </span>
            </div>
          ))}
        </MenuOptions>

        <MenuOptions title="precisa de talher?" description="escolha até 1">
          {data?.cutlery?.map((cutler: any) => (
            <label
              key={cutler.id}
              className="flex items-center justify-between pl-2 pb-2 border rounded-md"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="cutlery"
                  checked={selectedCutlery?.id === cutler.id}
                  onChange={() => handlerSelectedCutlery(cutler)}
                  className="form-radio text-[#9333EA]"
                />
                <span className="text-[#1a1a1a]">{cutler.name}</span>
              </div>
              {cutler.price && (
                <span className="text-[#9333EA] font-bold">
                  +R$ {cutler.price.toFixed(2)}
                </span>
              )}
            </label>
          ))}
        </MenuOptions>

        <MenuOptions title="mais alguma coisa?" description="escolha até 3">
          {data?.extras?.map((extra: any) => (
            <label
              key={extra.id}
              className="flex items-center justify-between pl-2 pb-2 border rounded-md"
            >
              <div className="flex items-center gap-2 custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedExtras.includes(extra.id)}
                  onChange={() => handlerSelectedExtras(extra)}
                  className="form-checkbox text-[#9333EA]"
                />
                <span className="text-[#1a1a1a]">{extra.name}</span>
              </div>
              <span className="text-[#9333EA] font-bold">
                +R$ {extra.price.toFixed(2)}
              </span>
            </label>
          ))}
        </MenuOptions>

        <TextArea
          rows={4}
          placeholder="alguma observação?  * opcional ex: tirar algum ingrediente, ponto do prato"
          className="mt-2"
          style={{ resize: "none" }}
        />

        {selectedAccompaniments?.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white  pl-4 pr-4 pb-6 shadow-lg">
            <div className="max-w-2xl mx-auto flex justify-between items-center">
              <button
                className="bg-[#9333EA] w-full text-white py-3 border-none rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-pointer"
                onClick={() => redirect(`/cart`)}
              >
                ver ticket
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
