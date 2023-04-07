import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import data from "@/utils/data";
import GameItem from "@/components/gameItem";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout pageTitle="Awesome Games">
      <div>
        {data.games.map(game => (
          <GameItem game={game} key={game.slug}></GameItem>
        ))}
      </div>
    </Layout>
  );
}
