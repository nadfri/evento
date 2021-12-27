import { MongoClient } from "mongodb";

export async function connectToDB() {
  const admin = process.env.mongoDB_admin;
  const mdp = process.env.mongoDB_mdp;
  const db_name = process.env.db_name;
  // Connection à MongoDb
  const client = await MongoClient.connect(
    `mongodb+srv://${admin}:${mdp}@cluster0.vkppp.mongodb.net/${db_name}?retryWrites=true&w=majority`
  );
  return client;
}
