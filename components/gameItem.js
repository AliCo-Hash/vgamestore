import Link from "next/link";
import styles from "../styles/homeGame.module.css";

export default function GameItem({ game }) {
  return (
    <div>
      <Link href={`/games/${game.slug}`}>
        <img
          className={styles.frontImage}
          src={game.coverImage}
          alt={game.name}
        />
      </Link>

      <div className={styles.cardDescription}>
        <p>£{game.price}</p>
        <p>{game.platform}</p>
        <button className={styles.addToCart} type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
