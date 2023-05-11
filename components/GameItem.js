import Link from "next/link";
import styles from "../styles/homeGame.module.css";
import Image from "next/image";

export default function GameItem({ game, addToCartHandler }) {
  return (
    <div>
      <Link href={`/games/${game.slug}`}>
        <Image
          className={styles.frontImage}
          src={game.coverImage}
          alt={game.name}
          width={500}
          height={250}
          priority={true}
          quality={100}
        />
      </Link>

      <div className={styles.cardDescription}>
        <p>£{game.price}</p>
        <p>{game.platform}</p>
        <button
          className={styles.addToCart}
          type="button"
          onClick={() => addToCartHandler(game)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
