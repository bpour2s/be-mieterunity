import { mongoose } from "mongoose";
import chalk from "chalk";

export default async function db() {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "mieterunity",
    });
    console.log(chalk.cyan(`DB connected to ${mongo.connection.name}`));
  } catch (error) {
    throw new Error("DB connection faild. Shouting down...");
  }
}
