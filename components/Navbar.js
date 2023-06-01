import Link from "next/link";
import styles from "../styles/navbar.module.css";
import { useContext, useState, useEffect } from "react";
import { Store } from "@/utils/Store";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";

export default function Navbar() {
  const { state, dispatch } = useContext(Store);
  const cart = state.cart;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { status, data: session } = useSession();

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <nav className={styles.container}>
      <Link className={styles.textHome} href="/">
        Awesome Games
      </Link>
      <div className={styles.textRight}>
        <div className={styles.menuContainer}>
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
              <Menu.Items className={styles.dropdownContent}>
                <Menu.Item>
                  <Link className={styles.dropdownLink} href="/profile">
                    Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link className={styles.dropdownLink} href="/order-history">
                    Order History
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <a
                    className={styles.dropdownLink}
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link className={styles.textSignIn} href="/signin">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}


