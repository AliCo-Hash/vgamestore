import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.background}>
      <Link className={styles.textHome} href="/">
        Awesome Games
      </Link>
      <div className={styles.textRight}>
        <Link className={styles.textCart} href="/cart">
          Cart
        </Link>
        <Link className={styles.textSignIn} href="/signin">
          Sign in
        </Link>
      </div>
    </nav>
  );
}
