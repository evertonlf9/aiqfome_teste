"use client";
import { DollarOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { redirect } from "next/navigation";

export default function RenderItens({categories, restaurantId }: {categories: any, restaurantId: number }) {

  const handlerClickSelectItem = (item: any) => {
    redirect(`/restaurant/${restaurantId}/${item.id}`);
  };
  
   const createItens = () => {
      return categories.map((category: any) => ({
        key: category.id,
        label: (
          <div>
            <p className="m-0 font-bold">
              {category.name}
              <DollarOutlined className="icon-dollar ml-2" />
            </p>
            <span className="text-sm text-gray-500">{category.description}</span>
          </div>
        ),
        children: (
          <div>
            {category.items.map((item: any) => (
              <div
                key={item.id}
                onClick={() => handlerClickSelectItem(item)}
                className="crusor-pointer"              
              >
                <div className="flex items-center justify-between h-[auto] font-semibold text-sm">
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center justify-between h-[auto]" style={{ marginTop: "-20px" }}>
                  <p className="w-[250px] leading-normal text-[#6D6F73] font-normal">{item.description}</p>
                  <div>
                    <span
                      className={
                        item.promotional_price
                          ? "price-item text-[#6D6F73]"
                          : "text-color-default"
                      }
                    >
                      R$ {item.price.toFixed(2)}
                    </span>
  
                    {item?.promotional_price && (
                      <p className="mt-2 icon-dollar">
                        <DollarOutlined className="icon-dollar mr-2" />
                        R$ {item.promotional_price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
      }));
    };

  return (
    <div>
      <Collapse items={createItens()} />
    </div>
  );
};
