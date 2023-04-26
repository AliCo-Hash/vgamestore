import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import data from "@/utils/data";
import GameItem from "@/components/GameItem";
import styles from "../styles/homeGame.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout pageTitle="Awesome Games">
      <div className={styles.mainGames}>
        {data.games.map(game => (
          <GameItem game={game} key={game.slug}></GameItem>
        ))}
      </div>
    </Layout>
  );
}
