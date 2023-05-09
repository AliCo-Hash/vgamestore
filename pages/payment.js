import Layout from "@/components/Layout";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/payment.module.css";
import { useContext, useEffect } from "react";
import { Store } from "@/utils/Store";

export default function Payment() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const totalPrice = cartItems
    .reduce((a, c) => a + c.quantity * c.price, 0)
    .toFixed(2);

  const [{ isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const loadPaypalScript = async () => {
      // const clientId = await fetch("/api/keys/paypal").then(response =>
      //   response.json()
      // );
      dispatch({
        type: "resetOptions",
        value: {
          "client-id": "test",
          currency: "GBP",
        },
      });
      dispatch({ type: "setLoadingStatus", value: "pending" });
    };
    loadPaypalScript();
  }, [dispatch]);

  if (status === "loading") {
    return <Layout>Loading...</Layout>;
  }

  if (!session) {
    router.push("/signin");
  }

  return (
    <Layout pageTitle="Payment">
      <div className={styles.container}>
        {isPending ? (
          <div>Loading...</div>
        ) : (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalPrice,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(details => {
                const name = details.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
              });
            }}
          />
        )}

        <div className={styles.cartCard}>
          <div className={styles.cardTitle}>Cart Summary</div>
          <div className={styles.cardDesc}>
            Total Price: £{" "}
            <span className={styles.totalPrice}>{totalPrice}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
