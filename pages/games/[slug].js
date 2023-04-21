import Layout from "@/components/layout";
import { Store } from "@/utils/Store";
import data from "@/utils/data";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import styles from "styles/game.module.css";

export default function GameScreen() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const game = data.games.find(e => e.slug === slug);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(e => e.slug === game.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({ type: "CART_ADD_ITEM", payload: { ...game, quantity } });
  };

  return (
    <Layout pageTitle={game.name}>
      <div className={styles.individualGameMain}>
        <div>
          <h1 className={styles.gameNameTitle}>{game.name}</h1>
        </div>
        <div className={styles.mainImage}>
          <Image
            src={game.coverImage}
            alt={game.name}
            height={300}
            width={600}
          />
        </div>
        <div>
          <div className={styles.priceCard}>
            <div>£{game.price}</div>
            <div>
              <button className={styles.addToCart} onClick={addToCartHandler}>
                Add to cart
              </button>
            </div>
          </div>
          <div className={styles.gameDescriptionTitle}>Game Description</div>
          <div className={styles.gameDescription}>{game.description}</div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = data.games.map(game => ({ params: { slug: game.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const game = data.games.find(game => game.slug === slug);

  return {
    props: {
      game,
    },
  };
}
