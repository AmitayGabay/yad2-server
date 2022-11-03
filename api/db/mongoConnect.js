require("dotenv").config()
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.t0e15tv.mongodb.net/shop`);
    console.log("mongo connect");
}