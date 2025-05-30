export default function Payment({ subtotal }: { subtotal: number }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <div className="flex flex-wrap mb-4 ml-4">
          <span className="text-md w-full font-bold">subtotal</span>
          <span className="text-[#9333EA] text-xl font-bold">
            R$ {subtotal?.toFixed(2)}
          </span>
        </div>
        <button
          className="bg-[#9333EA] text-white py-3 border-none rounded-lg font-medium hover:bg-purple-700 transition-colors"
          style={{ width: "170px" }}
          onClick={() => {}}
        >
          ir para pagamento
        </button>
      </div>
    </div>
  );
}
