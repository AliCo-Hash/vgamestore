import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import GameItem from "@/components/GameItem";
import styles from "../styles/homeGame.module.css";
import Game from "@/models/Game";
import db from "@/utils/db";

const inter = Inter({ subsets: ["latin"] });

export default function Home({games}) {
  return (
    <Layout pageTitle="Awesome Games">
      <div className={styles.mainGames}>
        {games.map(game => (
          <GameItem game={game} key={game.slug}></GameItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const games = await Game.find().lean().then((game) => JSON.parse(JSON.stringify(game)));
  return {
    props: {
      games,
    }
  }
}
