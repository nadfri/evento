/*Librairies*/
import React, { useState, useRef } from "react";
import Head from "next/head";
import moment from "moment";

/*Component*/
import AddCardBtn from "../Components/AddCardBtn/AddCardBtn";
import Card from "../Components/Card/Card";
import ModaleNewEvent from "../Components/ModalNewEvent/ModaleNewEvent";
import { FaSortAmountDown } from "react-icons/fa";

/*CSS*/
import styles from "./index.module.scss";

/*Utils*/
import { connectToDB } from "../helpers/mongodb";

export default function Index({ events }) {
  const refIcon = useRef(null);

  const [listEvents, setListEvents] = useState(events);
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const sortedEventsByOrganiser = () => {
    if (refIcon.current.classList.contains(styles.iconRotate)) {
      setListEvents(events);
    } else {
      const sortedEvents = [...events].sort((a, b) =>
        a.organisateur.localeCompare(b.organisateur)
      );
      setListEvents(sortedEvents);
    }
    refIcon.current.classList.toggle(styles.iconRotate);
  };

  return (
    <div className={styles.Index}>
      <Head>
        <title>Evento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Prochains Événements:</h1>
        <div className={styles.icon} ref={refIcon} onClick={sortedEventsByOrganiser}>
          <FaSortAmountDown />
        </div>
      </header>
      <div className={styles.containerCard}>
        {listEvents.map((event) => (
          <Card key={event._id} event={event} />
        ))}

        <AddCardBtn open={openModal} />
      </div>
      {modal && <ModaleNewEvent close={closeModal} />}
    </div>
  );
}

export async function getServerSideProps() {
  let events = [];

  try {
    //Connection à MongoDb
    const client = await connectToDB();
    //Connexion à la base de données
    const db = client.db();
    //Récupération des events
    events = await db.collection("events").find().sort({ date: "ascending" }).toArray();
  } catch (error) {
    console.log("error", error);
  }

  /*Filtrage des events*/
  events = events.filter((event) => moment(event.date).add(10,"days") > moment());

  return {
    props: {
      events: JSON.parse(JSON.stringify(events)),
    },
  };
}
