import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        coverImage: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        orderedGameCodes: { type: Array, required: true },
      },
    ],
    paymentDetails: [
      {
        id: { type: String },
        status: { type: String },
        purchase_units: [
          {
            amount: {
              currency_code: { type: String },
              value: { type: String },
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
