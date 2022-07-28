import mongoose from "mongoose";
mongoose.connect('mongodb+srv://bryan:180900@cluster0.ebylj.mongodb.net/alura-node?');
let db = mongoose.connection;
export default db;