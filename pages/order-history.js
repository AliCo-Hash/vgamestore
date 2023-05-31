import Layout from "@/components/Layout";
import OrderTable from "@/components/OrderTable";
import Order from "@/models/Order";
import db from "@/utils/db";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "styles/order.module.css";

export default function OrderHistory({ orders }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  if (status === "loading") {
    return <Layout>Loading...;</Layout>;
  }

  return (
    <Layout>
      <h1>Your Order</h1>
      <div className={styles.orderGrid}>
        <div className={styles.orderBox}>
          {orders.map(order => (
            <OrderTable key={order._id} orderItems={order.orderItems} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  await db.connect();
  const orders = await Order.find({ user: session?.user?._id }).lean();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
