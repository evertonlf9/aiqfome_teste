"use client";

import Item from "@/components/item";
import Payment from "@/components/payment";
import Header from "@/components/payment/header";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  drinks?: { name: string; price: number; quantity: number }[];
  ingredients?: string[];
  observation?: string;
  extras?: { name: string; price: number }[];
}

export default function CartPage() {
  const restaurant = {
    id: 1,
    name: "Matsuri Concept",
    logo: "/initial/matsuri.png",
    rating: 4.7,
    status: "open",
    delivery: "grátis",
    delivery_fee: 4.99,
    delivery_time: "30-40 min",
    distance: "5.2km",
    min_order: 15.0,
    closing_time: "20: 00",
    free_delivery_above: 35.0,
  };

  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Ceviche de salmão",
      price: 19.9,
      quantity: 2,
      size: "médio",
      drinks: [{ name: "coca-cola", price: 5.0, quantity: 1 }],
    },
    {
      id: 2,
      name: "Temaki Filadélfia",
      price: 14.0,
      quantity: 1,
      ingredients: ["shimeji", "cream cheese", "tomate seco"],
      observation: "tirar a cebolinha",
    },
    {
      id: 3,
      name: "Temaki Mix",
      price: 22.0,
      quantity: 1,
      extras: [{ name: "salmão", price: 8.0 }],
    },
    {
      id: 4,
      name: "Coca-cola lata",
      price: 10.0,
      quantity: 2,
    },
  ]);

  const handleQuantityChange = (id: number, increment: boolean) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: increment
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1),
          };
        }
        return item;
      })
    );
  };

  const subtotal = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    const drinksTotal =
      item.drinks?.reduce(
        (sum, drink) => sum + drink.price * drink.quantity,
        0
      ) || 0;
    const extrasTotal =
      item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
    return acc + itemTotal + drinksTotal + extrasTotal;
  }, 0);

  return (
    <div className="max-w-2xl mx-auto p-2">
      <Header restaurant={restaurant} />

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg">{item.name}</h2>
              <span className="text-[#9333EA] font-medium">
                R$ {item.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-end ">
              <button
                className="text-[#9333EA] mr-4 border-none button-plus text-sm hover:underline"
                onClick={() => {}}
              >
                <AiOutlineEdit className="inline-block mr-1" />
                editar
              </button>

              <div className="flex items-center gap-3">
                <button
                  className="text-gray-400 button-plus hover:text-gray-600 border-none"
                  onClick={() => handleQuantityChange(item.id, false)}
                >
                  <span className="text-xl"><AiOutlineDelete /></span>
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  className="text-[#9333EA] hover:text-purple-700 button-plus button-default"
                  onClick={() => handleQuantityChange(item.id, true)}
                >
                  <AiOutlinePlus className="svg-default" />
                </button>
              </div>
            </div>

            {item.size && (
              <div>
                <p className="text-sm text-gray-600 m-0">• tamanho</p>
                <p className="text-sm ml-2 m-0">{item.size}</p>
              </div>
            )}

            {item.drinks && item.drinks.length > 0 && (
              <Item title="• vai querer bebida?" itens={item.drinks} />
            )}

            {item.ingredients && item.ingredients.length > 0 && (
              <Item title="• escolha 3 ingredientes" itens={item.ingredients} />
            )}

            {item.extras && item.extras.length > 0 && (
              <Item title="• quer o dobro?" itens={item.extras} />
            )}

            {item.observation && (
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-600 m-0">
                  observação: {item.observation}
                </p>
              </div>
            )}

            
          </div>
        ))}
      </div>

      <Payment subtotal={subtotal} />
    </div>
  );
}
