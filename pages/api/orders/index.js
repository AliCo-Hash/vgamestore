import Order from "../../../models/Order";
import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    console.log("User not found");
    return res.status(401).send("Signin required");
  }

  await db.connect();
  console.log("Request Body:", req.body);
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  console.log("New Order:", newOrder);

  try {
    const order = await newOrder.save();
    console.log("Order created:", order);
    res.status(201).send(order);
  } catch (error) {
    console.log("Error saving order:", error);
    res.status(500).send("Error creating order: " + error.message);
  }
};

export default handler;
