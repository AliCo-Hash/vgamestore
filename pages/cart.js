import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import styles from "styles/cart.module.css";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

function CartPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = item => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const data = await fetch(`/api/games/${item._id}`).then(response =>
      response.json()
    );
    if (data.gameCodesLength < quantity) {
      return toast.error("Sorry, Game is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

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
                  <th className={styles.cartItem}></th>
                  <th className={styles.cartQuantity}></th>
                  <th className={styles.cartPrice}></th>
                  <th className={styles.cartAction}></th>
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
                          className={styles.image}
                          src={item.coverImage}
                          alt={item.name}
                          width={200}
                          height={100}
                          priority={true}
                        ></Image>
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className={styles.cartQuantity}>
                      <select
                        value={item.quantity}
                        onChange={e => updateCartHandler(item, e.target.value)}
                      >
                        {[...Array(item.gameCodesLength).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className={styles.cartPrice}>£{item.price}</td>
                    <td className={styles.cartItemDelete}>
                      <button onClick={() => removeItemHandler(item)}>
                        <TrashIcon className={styles.itemDeleteButton} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.cartSummary}>
            <ul style={{ listStyle: "none" }}>
              <li>
                <div className={styles.cartTotal}>
                  TOTAL : £{""}
                  {cartItems
                    .reduce((a, c) => a + c.quantity * c.price, 0)
                    .toFixed(2)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("signin?redirect=/payment")}
                  className={styles.cartProceed}
                >
                  PROCEED TO PAYMENT
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
