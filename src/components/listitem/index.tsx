"use client";

import { useAppContext } from "@/context/appContext";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCycling } from "react-icons/bi";

type Restaurant = {
  id: number;
  name: string;
  logo: string;
  rating: number;
  status: string;
  delivery: string;
  location?: string;
};

const Listitem = ({
  restaurants,
  data,
}: {
  restaurants: Restaurant[];
  data?: any;
}) => {
  const { filter, handleHiddenFilterChange } = useAppContext();

  const [listRestaurants, setListRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && data) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    if (filter || !filter) {
      setListRestaurants(filteredRestaurants());
    }
  }, [filter]);

  const handlerClickItem = (restaurant: Restaurant) => {
    if (restaurant.status === "open") {
      handleHiddenFilterChange(true)
      redirect(`/restaurant/${restaurant.id}`);
    }
  };

  const filteredRestaurants = () => {
    if (filter?.length < 3) {
      return restaurants;
    }

    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className="space-y-4">
      {listRestaurants?.map((restaurant) => (
        <div
          key={restaurant.id}
          className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          style={{
            cursor: restaurant.status === "close" ? "not-allowed" : "pointer",
          }}
          onClick={() => handlerClickItem(restaurant)}
        >
          <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={restaurant.logo}
              alt={restaurant.name}
              fill
              style={{ objectFit: "contain" }}
              className={restaurant.status === "close" ? "opacity-50" : ""}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-[#1a1a1a]">{restaurant.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              {restaurant.delivery === "grátis" ? (
                <span className="flex items-center text-sm text-[#00a650]">
                  <BiCycling className="mr-1" />
                  {restaurant.delivery}
                </span>
              ) : (
                <span className="flex items-center text-sm text-[#666666]">
                  <BiCycling className="mr-1" />
                  {restaurant.delivery}
                </span>
              )}
              <span className="flex items-center text-sm text-[#666666]">
                ★ {restaurant.rating}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listitem;
