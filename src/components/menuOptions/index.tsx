type MenuOptionsProps = {
  isRequired?: boolean; 
  title: string;
  description: string;  
  children: React.ReactNode;
};

export default function MenuOptions({
  isRequired,
  title,
  description,
  children
}: MenuOptionsProps) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-base font-medium text-[#202326] font-bold m-0 mt-2">
          {title}
        </h2>
        {isRequired && (
          <button
            className="mt-4 bg-[#393A3C] text-white py-2 px-4 rounded-md border-none"
            disabled
          >
            obrigatório
          </button>
        )}
      </div>
      <p className="text-sm text-[#666666] m-0">{description}</p>
      <div className="mt-2 space-y-2">
        {children}
      </div>
    </div>
  );
}
