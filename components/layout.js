import Head from "next/head";
import styles from "../styles/layout.module.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ pageTitle, children }) {
  return (
    <div className={styles.globalStuff}>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/siteicon.png" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className={styles.container}>
        <Navbar />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
