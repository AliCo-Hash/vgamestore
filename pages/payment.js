import Layout from "@/components/Layout";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/payment.module.css";

export default function Payment() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        <div>cart summary</div>
      </div>
    </Layout>
  );
}
