import { Collections } from "@/components/layout/collections";
import { HeroSection } from "@/components/layout/hero";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <HeroSection />

      <div className="xl:hidden w-full inline-flex justify-center my-10">
        <a href="https://peerlist.io/aryanpageme/project/drapes-ui" target="_blank" rel="noreferrer">
          <img
            src="https://peerlist.io/api/v1/projects/embed/PRJHOK8NGOJ669RQRF8L86KEA96KBR?showUpvote=true&theme=dark"
            alt="Drapes UI"
            style={{
              "width": "auto",
              "height": "72px"
            }}
          />
        </a>
      </div>

      <Collections />

      <div className="hidden xl:block absolute right-10 top-4">
        <a href="https://peerlist.io/aryanpageme/project/drapes-ui" target="_blank" rel="noreferrer">
          <img
            src="https://peerlist.io/api/v1/projects/embed/PRJHOK8NGOJ669RQRF8L86KEA96KBR?showUpvote=true&theme=dark"
            alt="Drapes UI"
            style={{
              "width": "auto",
              "height": "72px"
            }}
          />
        </a>
      </div>
    </main>
  );
}
