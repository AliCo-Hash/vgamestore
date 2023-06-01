import Link from "next/link";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <nav className={styles.container}>
      <Link href="/about" className={styles.aboutLink}>
        About us
      </Link>
    </nav>
  );
}
