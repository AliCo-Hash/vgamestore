import Link from "next/link";
import Image from "next/image";
import styles from "../styles/homeGame.module.css";

export default function GameItem({ game }) {
  return (
    <div className={styles.gameCard}>
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
        <p className={styles.gamePrice}>£{game.price}</p>
        <p className={styles.gamePlatform}>{game.platform}</p>
        <button className="addtocart" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
