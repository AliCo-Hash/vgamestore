import Link from "next/link";
import styles from "../styles/layout.module.css";

export default function Navbar() {
  return (
    <nav>
      <Link className={styles.home} href="/">
        Awesome
      </Link>
      <div>
        <Link href="/cart">Cart</Link>
        <Link href="/signin">Sign in</Link>
      </div>
    </nav>
  );
}
