const { default: Game } = require("@/models/Game");
const { default: db } = require("@/utils/db");

const handler = async (req, res) => {
  await db.connect();
  const game = await Game.findById(req.query.id);
  await db.disconnect();
  res.send(game);
};

export default handler;
