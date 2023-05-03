import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import GameItem from "@/components/GameItem";
import styles from "../styles/homeGame.module.css";
import Game from "@/models/Game";
import db from "@/utils/db";
import { useContext } from "react";
import { Store } from "@/utils/Store";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ games }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async game => {
    const existItem = cart.cartItems.find(e => e.slug === game.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const data = await fetch(`/api/games/${game._id}`).then(data =>
      data.json()
    );

    if (data.gameCodes.length < quantity) {
      return toast.error("Sorry, Game is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...game, quantity } });
  };

  return (
    <Layout pageTitle="Awesome Games">
      <div className={styles.mainGames}>
        {games.map(game => (
          <GameItem
            game={game}
            key={game.slug}
            addToCartHandler={addToCartHandler}
          ></GameItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const games = await Game.find()
    .lean()
    .then(game => JSON.parse(JSON.stringify(game)));
  return {
    props: {
      games,
    },
  };
}
