import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    coverImage: { type: String, required: true },
    price: { type: Number, required: true },
    platform: { type: String, required: true },
    description: { type: String, required: true },
    gameCodes: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
