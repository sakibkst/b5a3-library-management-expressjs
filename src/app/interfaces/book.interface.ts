import { Model, Types } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface UserStaticMethod extends Model<IBook>{
  updateAvailability(bookId: Types.ObjectId): void;
}

// export interface UserInstanceMethod {
//   updateAvailability(password: Types.ObjectId): void;
// }
