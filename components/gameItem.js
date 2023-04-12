import Link from "next/link";
import Image from "next/image";
import styles from "../styles/homeGame.module.css";

export default function GameItem({ game }) {
  return (
    <div>
      <Link href={`/games/${game.slug}`}>
        <Image
          className={styles.frontImage}
          src={game.coverImage}
          alt={game.name}
          height={350}
          width={616}
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
