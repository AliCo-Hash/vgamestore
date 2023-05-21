import Layout from "@/components/Layout";
import Order from "@/models/Order";
import db from "@/utils/db";

export default function OrderedScreen({ order }) {
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
