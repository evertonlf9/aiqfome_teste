import Image from "next/image";

import Listitem from "@/components/listitem";
import { getDataJson } from "@/utils";

export default async function Home() {
  const data =  getDataJson()  

  return (
    <div className="max-w-7x1 mx-auto w-full">
      <div className="relative w-full h-[132px] overflow-hidden mb-4">
        <Image
          src="/inicial.png"
          alt="Promoção: Rango barato no dia das crianças"
          fill
          priority
          className="mt-1"
        />
      </div>
      <h2 className="text-xl font-medium mb-4 pl-4 font-extrabold text-color-default">
        Abertos
      </h2>

      <Listitem restaurants={data.restaurants} data={data} />

      <h2 className="text-xl font-medium mb-4 pl-4 font-extrabold text-color-default">
        Fechados
      </h2>

      <Listitem restaurants={data.closeRestaurants} />
    </div>
  );
}
