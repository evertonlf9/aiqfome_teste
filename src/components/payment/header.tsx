import Image from "next/image";

export default function Header({restaurant}: { restaurant: any }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={restaurant.logo}
        alt="Logo"
        width={36}
        height={36}
        className="rounded-lg"
      />
      <div>
        <p className="text-sm text-gray-500 m-0">seus itens em</p>
        <h1 className="text-lg font-medium mt-1">{restaurant.name}</h1>
      </div>
    </div>
  );
}
