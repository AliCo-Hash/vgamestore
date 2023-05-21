import Game from "@/models/Game";
import Order from "../../../models/Order";
import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send("Signin required");
  }

  await db.connect();

  try {
    const { orderItems, paymentDetails } = req.body;

    const updatedOrderedItems = await Promise.all(
      orderItems.map(async e => {
        const game = await Game.findOne({ name: e.name });

        const orderedGameCodes = game.gameCodes.splice(0, e.quantity);
        await game.save();

        return {
          ...e,
          orderedGameCodes,
        };
      })
    );

    const newOrder = new Order({
      user: user._id,
      orderItems: updatedOrderedItems,
      paymentDetails,
    });

    const order = await newOrder.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send("Error creating order: " + error.message);
  }
};

export default handler;
