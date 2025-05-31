export default function Item({ title, itens }: { title: string; itens: any }) {
  const renderItem = (item: any, index: number) => {
    if (item?.price) {
      return (
        <div key={index} className="flex items-center justify-between ml-2 m-0">
          <p className="text-sm m-0">{item.name}</p>
          <span className="text-color-primary text-sm">
            +R${item.price.toFixed(2)}
          </span>
        </div>
      );
    }

    return (
      <p key={index} className="text-sm ml-2 m-0">
        {item}
      </p>
    );
  };

  return (
    <div>
      <p className="text-sm text-gray-600 m-0">{title}</p>
      {itens?.map((item: any, index: number) => renderItem(item, index))}
    </div>
  );
}
