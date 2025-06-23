import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: [0, "Quantity must be a positive number"] },
    dueDate: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

export const Borrow = model("Borrow", borrowSchema);
