import Image from "next/image";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiCycling } from "react-icons/bi";

import { getDataJson } from "@/utils";
import RenderItens from "@/components/renderItens";

export default async function Restaurant({
  params,
}: {
  params: { id: string };
}) {
  const data = getDataJson();
  const id = parseInt(params?.id);

  const restaurant = await data.restaurants.find(
    (restaurant: any) => restaurant.id === id
  );
  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-[#FF6B00]">
            <Image
              src={restaurant.logo}
              alt={restaurant.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-medium text-[#1a1a1a]">
              {restaurant.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <AiOutlineShareAlt className="text-2xl text-gray-600" />
          <AiOutlineHeart className="text-2xl text-gray-600" />
          <span className="text-[#00A6E6] ml-auto">mais infos ›</span>
        </div>

        <div className="mt-4 space-y-2 text-sm text-[#666666]">
          <div className="flex items-center gap-2">
            <BiCycling className="text-lg" />
            <span>R$ {restaurant.delivery_fee.toFixed(2)}</span>
            <span>•</span>
            <span>{restaurant.delivery_time}</span>
            <span>•</span>
            <span>{restaurant.distance}</span>
          </div>
          <p className="text-[#00A650]">
            entrega grátis acima de R${" "}
            {restaurant.free_delivery_above.toFixed(2)}
          </p>
          <div className="flex items-center gap-2">
            <span>★ {restaurant.rating} de 5</span>
            <span>•</span>
            <span>fecha às {restaurant.closing_time}</span>
          </div>
          <p>pedido mínimo: R$ {restaurant.min_order.toFixed(2)}</p>
        </div>
      </div>

      <RenderItens restaurantId={restaurant.id} categories={restaurant?.categories} />
    </div>
  );
}
