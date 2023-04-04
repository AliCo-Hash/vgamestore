import Head from "next/head";
import styles from "../styles/layout.module.css";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ pageTitle, children }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/siteicon.png" />
      </Head>

      <div className={styles.container}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
