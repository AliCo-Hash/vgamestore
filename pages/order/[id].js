import Layout from "@/components/Layout";
import Order from "@/models/Order";
import db from "@/utils/db";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function OrderedScreen({ order }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Layout>Loading...</Layout>;
  }

  if (!session) {
    router.push("/signin");
  }

  if (session && order && session.user._id === order.user) {
    return (
      <Layout>
        <h1>Order</h1>
        {order &&
          order.orderItems &&
          order.orderItems.map((item, index) => (
            <p key={index}>Order Item Name: {item.name}</p>
          ))}
      </Layout>
    );
  }

  return <Layout>You are not authorized to view this order.</Layout>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  await db.connect();
  const order = await Order.findOne({ "paymentDetails.id": id })
    .lean()
    .then(order => JSON.parse(JSON.stringify(order)));
  await db.disconnect();

  return {
    props: {
      order,
    },
  };
}
