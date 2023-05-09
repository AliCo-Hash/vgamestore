import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send("You must be signed in");
  }
  const clientId = process.env.PAYPAL_CLIENT_ID;
  res.status(200).json(clientId);
};

export default handler;
