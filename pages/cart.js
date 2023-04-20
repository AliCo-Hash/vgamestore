import Layout from "@/components/layout";
import { Store } from "@/utils/Store";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import styles from "styles/cart.module.css";
import TrashIcon from "@heroicons/react/24/outline/XCircleIcon";

export default function CartPage() {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <Layout pageTitle="Your Basket">
      <h1 className={styles.cartTitle}>Your Cart</h1>
      {cartItems.length == 0 ? (
        <div>
          Your cart is empty. Go ahead and add some cool stuff to it!{" "}
          <Link href="/">Browse Games</Link>
        </div>
      ) : (
        <div className={styles.cartGrid}>
          <div className={styles.cartBox}>
            <table className={styles.cartTable}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.cartItem}>Item</th>
                  <th className={styles.cartQuantity}>Quantity</th>
                  <th className={styles.cartPrice}>Price</th>
                  <th className={styles.cartAction}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.slug} className={styles.tableBody}>
                    <td>
                      <Link
                        href={`games/${item.slug}}`}
                        className={styles.cartGame}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className={styles.cartQuantity}>{item.quantity}</td>
                    <td className={styles.cartPrice}>{item.price}</td>
                    <td className={styles.cartItemDelete}>
                      <button>
                        <TrashIcon
                          className={styles.itemDeleteButton}
                        ></TrashIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}
