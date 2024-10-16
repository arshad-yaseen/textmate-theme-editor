import Hero from "@/components/home/hero";
import Header from "@/components/home/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative grid grid-rows-[1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 w-full h-full border border-muted-foreground/60 opacity-30 transform -translate-x-[calc(25%-50px)] -translate-y-[calc(25%-50px)]" />
          <div className="absolute inset-0 w-full h-full border border-muted-foreground/60 opacity-20 transform translate-x-[calc(25%-50px)] translate-y-[calc(25%-50px)]" />
        </div>
        <div className="relative z-10">
          <Hero />
        </div>
      </main>
    </div>
  );
}
