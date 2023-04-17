import Layout from "@/components/layout";
import data from "@/utils/data";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "styles/game.module.css";

export default function GameScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const game = data.games.find(e => e.slug === slug);

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
              <button className={styles.addToCart}>Add to cart</button>
            </div>
          </div>
          <div className={styles.gameDescriptionTitle}>Game Description</div>
          <p className={styles.gameDescription}>{game.description}</p>
        </div>
      </div>
    </Layout>
  );
}
