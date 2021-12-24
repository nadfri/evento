/*Librairies*/
import React, { useState } from "react";
import Head from "next/head";
import moment from "moment";
 
/*Component*/
import AddCard from "../Components/AddCard/AddCard";
import Card from "../Components/Card/Card";
import ModaleNewEvent from "../Components/ModalNewEvent/ModaleNewEvent";

/*CSS*/
import styles from "./index.module.scss";

/*Utils*/
import { connectToDB } from '../helpers/mongodb';

export default function Index({events}) {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

const eventsToDisplay = events.map(event => 
  moment(event.date) > moment() && <Card key={event._id} event={event} />);



  return (
    <div className={styles.Index}>
      <Head>
        <title>Evento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Prochains Événements</h1>
      <div className={styles.containerCard}>
       {eventsToDisplay}
        
        <AddCard open={openModal}/>
      </div>
        {modal && <ModaleNewEvent close={closeModal} />}
    </div>
  );
}

export async function getStaticProps() {

  let events = [];

  try {
		//Connection à MongoDb
		const client = await connectToDB();
		//Connexion à la base de données
		const db = client.db();
		//Récupération des projets
		 events = await db
			.collection('events')
			.find()
			.sort({ date: 'ascending' })
			.toArray();
	} catch (error) {
		console.log('error', error);
	}

	return {
		props: {
			events: JSON.parse(JSON.stringify(events)),
		},
		revalidate: 60, //refait un build chaque minute
	};


}
