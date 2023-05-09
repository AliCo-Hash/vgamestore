import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import Image from "next/image";
import { useContext } from "react";
import styles from "styles/game.module.css";
import db from "@/utils/db";
import Game from "@/models/Game";
import { toast } from "react-toastify";

export default function GameScreen(props) {
  const { game } = props;
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(e => e.slug === game.slug);
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
    <Layout pageTitle={game.name}>
      <div className={styles.individualGameMain}>
        <div>
          <h1 className={styles.gameNameTitle}>{game.name}</h1>
          <div className={styles.mainImage}>
            <Image src={game.coverImage} alt={game.name} fill />
          </div>
          <div>
            <div className={styles.gameDescriptionTitle}>Game Description</div>
            <div className={styles.gameDescription}>{game.description}</div>
          </div>
        </div>
        <div className={styles.priceCard}>
          <div className={styles.price}>£{game.price}</div>
          <div>
            <button
              className={styles.addToCartButton}
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

{
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const game = await Game.findOne({ slug })
    .lean()
    .then(game => JSON.parse(JSON.stringify(game)));
  await db.disconnect();

  return {
    props: {
      game,
    },
  };
}
