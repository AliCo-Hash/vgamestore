const { default: Game } = require("@/models/Game");
const { default: db } = require("@/utils/db");

const handler = async (req, res) => {
  await db.connect();
  const game = await Game.findById(req.query.id).lean();

  const gameCodesLength = game.gameCodes.length;
  delete game.gameCodes;

  await db.disconnect();
  res.send({ ...game, gameCodesLength });
};

export default handler;
