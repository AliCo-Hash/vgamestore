import Link from "next/link";
import styles from "../styles/navbar.module.css";
import { useContext, useState, useEffect } from "react";
import { Store } from "@/utils/Store";

export default function Navbar() {
  const { state } = useContext(Store);
  const cart = state.cart;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <nav className={styles.container}>
      <Link className={styles.textHome} href="/">
        Awesome Games
      </Link>
      <div className={styles.textRight}>
        <Link className={styles.textCart} href="/cart">
          Cart
          {cartItemsCount > 0 && (
            <span className={styles.cart}>{cartItemsCount}</span>
          )}
        </Link>
        <Link className={styles.textSignIn} href="/signin">
          Sign in
        </Link>
      </div>
    </nav>
  );
}
