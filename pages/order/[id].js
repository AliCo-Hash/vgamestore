import Layout from "@/components/Layout";
import OrderTable from "@/components/OrderTable";
import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import styles from "styles/order.module.css";

export default function OrderedScreen({ order }) {
  const total = order.orderItems.reduce((a, c) => a + c.price, 0);
  console.log(order);

  return (
    <Layout>
      <h1>Your Order</h1>
      <div className={styles.orderGrid}>
        <div className={styles.orderBox}>
          <OrderTable orderItems={order.orderItems} />
        </div>
        <div className={styles.orderSummary}>
          <div className={styles.orderTotal}>Total: £{total}</div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const { params } = context;
  const { id } = params;

  await db.connect();
  const order = await Order.findOne({ "paymentDetails.id": id })
    .lean()
    .then(order => JSON.parse(JSON.stringify(order)));
  await db.disconnect();

  if (!session || session.user._id != order.user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      order,
    },
  };
}
