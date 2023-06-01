import bcryptjs, { hash } from "bcryptjs";
import User from "@/models/User";
import db from "@/utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { email, oldPassword, newPassword } = req.body;
  if (
    !email ||
    !email.includes("@") ||
    !oldPassword ||
    oldPassword.trim().length < 8 ||
    !newPassword ||
    newPassword.trim().length < 8
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();

  const user = await User.findOne({ email: email });
  if (bcryptjs.compareSync(oldPassword, user.password)) {
    user.password = bcryptjs.hashSync(newPassword);
    user.save();
    await db.disconnect();
    res.status(200).json({
      message: "Password changed successfully",
    });
  } else {
    await db.disconnect();
    res.status(422).json({
      message: "Old password is incorrect",
    });
  }
}

export default handler;
