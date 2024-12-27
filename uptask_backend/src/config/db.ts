import mongoose from "mongoose";
import colors from "colors";
import {exit } from "node:process";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL);
        console.log(colors.bgYellow.black.bold(`MongoDB Connected: ${connection.connection.host} in port: ${connection.connection.port}`));

    } catch (error) {
        console.error(colors.red(`Error: ${error.message}`));
        exit(1);
    }
};