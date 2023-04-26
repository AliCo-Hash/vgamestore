import Link from "next/link";
import styles from "../styles/navbar.module.css";
import { useContext, useState, useEffect } from "react";
import { Store } from "@/utils/Store";
import { useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";

export default function Navbar() {
  const { state } = useContext(Store);
  const cart = state.cart;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const { status, data: session } = useSession();

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
        {status === "loading" ? (
          "Loading"
        ) : session?.user ? (
          <Menu as="div" className={styles.dropdown}>
            <Menu.Button className={styles.dropdownBtn}>
              {session.user.name}
            </Menu.Button>
            <Menu.Items className={styles.dropdownContents}></Menu.Items>
            <Menu.Items>
              <DropdownLink className="dropdownLink" href="/profile">
                Profile
              </DropdownLink>
            </Menu.Items>
          </Menu>
        ) : (
          <Link className={styles.textSignIn} href="/signin">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
