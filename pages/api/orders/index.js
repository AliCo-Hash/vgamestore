import Order from "../../../models/Order";
import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send("Signin required");
  }

  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  try {
    const order = await newOrder.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send("Error creating order: " + error.message);
  }
};

export default handler;
