import User from "../../models/User";
import Game from "../../models/Game";
import db from "../../utils/db";
import data from "../../utils/data";

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Game.deleteMany();
  await Game.insertMany(data.games);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
};

export default handler;
