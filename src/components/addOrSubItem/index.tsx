import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

export default function AddOrSubItem({ item, handleQuantityChange }: any) {
  return (
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
          <span className="text-xl" >
            <AiOutlineDelete />
          </span>
        </button>
        <span className="text-lg position-relative" style={{top: "-3px", right: "3px"}}>{item.quantity}</span>
        <button
          className="text-[#9333EA] hover:text-purple-700 button-plus button-default"
          onClick={() => handleQuantityChange(item.id, true)}
        >
          <AiOutlinePlus className="svg-default" />
        </button>
      </div>
    </div>
  );
}
