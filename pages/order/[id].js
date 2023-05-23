import Layout from "@/components/Layout";
import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import Image from "next/image";
import styles from "styles/order.module.css";

export default function OrderedScreen({ order }) {
  const total = order.orderItems.reduce((a, c) => a + c.price, 0);

  return (
    <Layout>
      <h1>Your Order</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map(game => (
              <tr key={game.name} className="check">
                <td>
                  <Image
                    src={game.coverImage}
                    alt={game.name}
                    width={200}
                    height={100}
                    priority={true}
                  />
                  {game.name}
                </td>
                <td>{game.quantity}</td>
                <td>{game.price}</td>
                <td>
                  {game.orderedGameCodes.map(code => (
                    <div key={code}>{code}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>{total}</div>
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
