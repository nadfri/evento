import { MongoClient } from 'mongodb';

export async function connectToDB() {
    const admin = process.env.mongoDB_admin;
	const mdp = process.env.mongoDB_mdp;
    const db_evento = process.env.db_evento;
	// Connection à MongoDb
	const client = await MongoClient.connect(
		`mongodb+srv://${admin}:${mdp}@cluster0.vkppp.mongodb.net/${db_evento}?retryWrites=true&w=majority`,
	);
	return client;
}