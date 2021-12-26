import { connectToDB } from '../../helpers/mongodb';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		//Verification des champs du formulaire
		for (let item in req.body) {
			if (req.body[item] === '') {
				res.status(422).json({ message: 'Champ manquant!' });
				return;
			}
		}

		//Stocker l'event dans une nouvelle variable
		const newEvent = {
			titre: req.body.titre,
			slug: req.body.slug,
			date: new Date(req.body.date + 'T' + req.body.time),
      email: req.body.email,
      organisateur: req.body.organisateur,
			description: req.body.description,
		};

		let clientMongoDB;
		//Connexion à la base de données
		try {
			clientMongoDB = await connectToDB();
			console.log('Connected to MongoDB');
		} catch (err) {
			res
				.status(500)
				.json({ message: 'Erreur lors de la connexion à la base de données' });
			return;
		}

		const db = clientMongoDB.db();
		//Ajout du projet dans la base de données
		try {
			await db.collection('events').insertOne(newEvent);
			console.log('Evenement ajouté');
		} catch (err) {
			res
				.status(500)
				.json({ message: "Erreur lors de l'insertion dans la base de données" });
			clientMongoDB.close();
			return;
		}

		//Succes
		clientMongoDB.close();
		res.status(201).json({ message: 'Evenement ajouté avec succès!', event: newEvent });
	}

  res.status(405).json({ message: 'Méthode non autorisée' });
}