import mongoose from "mongoose";

import { env } from "./utils/env.js";

async function initMongoConnection() {

const user = env("MONGODB_USER");
const pwd = env("MONGODB_PASSWORD");
const url = env("MONGODB_URL");
const db = env("MONGODB_DB");


    try {
        // await mongoose.connect("mongodb+srv://mstislavpushkov:hG8pejYluhqd8Ojq@cluster0.miylepz.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0");

await mongoose.connect(
  `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`
);

        console.log("Mongo connection successfully established!");

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {initMongoConnection };