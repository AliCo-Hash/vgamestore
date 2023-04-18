import Link from "next/link";
import styles from "../styles/navbar.module.css";
import { useContext } from "react";
import { Store } from "@/utils/Store";

export default function Navbar() {
  const { state } = useContext(Store);
  const cart = state.cart;
  return (
    <nav className={styles.background}>
      <Link className={styles.textHome} href="/">
        Awesome Games
      </Link>
      <div className={styles.textRight}>
        <Link className={styles.textCart} href="/cart">
          Cart
          {cart.cartItems && cart.cartItems.length > 0 && (
            <span className={styles.cart}>
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
        </Link>
        <Link className={styles.textSignIn} href="/signin">
          Sign in
        </Link>
      </div>
    </nav>
  );
}
