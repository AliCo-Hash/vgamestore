import Layout from "@/components/layout";
import data from "@/utils/data";
import { useRouter } from "next/router";
import React from "react";
import YouTube from "react-youtube";

export default function GameScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const game = data.games.find(e => e.slug === slug);
  return (
    <Layout pageTitle={game.name}>
      <h1>{game.name}</h1>
    </Layout>
  );
}
