import Head from "next/head";
import styles from "../styles/layout.module.css";

export default function Layout({ pageTitle, children }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/siteicon.png" />
      </Head>
      <div className={styles.container}>
        <header>header</header>
        <main>{children}</main>
        <footer>footer</footer>
      </div>
    </>
  );
}
