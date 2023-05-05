import Layout from "@/components/Layout";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/payment.module.css";
import { useContext } from "react";
import { Store } from "@/utils/Store";

export default function Payment() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  if (status === "loading") {
    return <Layout>Loading...</Layout>;
  }

  if (!session) {
    router.push("/signin");
  }

  return (
    <Layout pageTitle="Payment">
      <div className={styles.container}>
        <PayPalScriptProvider>
          <PayPalButtons />
        </PayPalScriptProvider>
        <div className={styles.cartCard}>
          <div className={styles.cardTitle}>Cart Summary</div>
          <div className={styles.cardDesc}>
            Total Price: £{" "}
            <span className={styles.totalPrice}>
              {cartItems
                .reduce((a, c) => a + c.quantity * c.price, 0)
                .toFixed(2)}{" "}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
