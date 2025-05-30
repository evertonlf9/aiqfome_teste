import Home from "./home/page";

export default function Initial() {
  return (
    <div className="items-center justify-items-center max-w-2xl mx-auto min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start  w-full">
        <Home />
      </main>
    </div>
  );
}
