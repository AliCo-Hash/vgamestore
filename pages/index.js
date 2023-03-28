import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1>Game Store</h1>
      <h2>
        <Link href="/games/godofwar">
          <Image src="/GodofWarfront.jpg" height={350} width={616} alt="" />
        </Link>
      </h2>
    </>
  );
}
