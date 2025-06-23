import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL as string,
};
