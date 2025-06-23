import { model, Schema, Types } from "mongoose";
import { IBook, UserStaticMethod } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      default: "FICTION",
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.static(
  "updateAvailability",
  async function (bookId: Types.ObjectId) {
    const book = await this.findById(bookId);
    if (book) {
      book.available = book.copies > 0;
      await book.save();
    } else {
      console.warn(`Book with ID ${bookId} not found for availability update.`);
    }
  }
);

bookSchema.post("findOneAndUpdate", async function (doc, next) {
  doc.available = doc.copies > 0;
  await doc.save();
  next();
});

export const Book = model<IBook, UserStaticMethod>("Book", bookSchema);
