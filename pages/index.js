import React, { useState } from "react";
import Head from "next/head";
import AddCard from "../Components/AddCard/AddCard";
import Card from "../Components/Card/Card";
import ModaleNewEvent from "../Components/ModalNewEvent/ModaleNewEvent";
import styles from "./index.module.scss";

export default function Index() {
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <div className={styles.Index}>
      <Head>
        <title>Evento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Prochains Événements</h1>
      <div className={styles.containerCard}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <AddCard open={openModal}/>
      </div>
        {modal && <ModaleNewEvent close={closeModal} />}
    </div>
  );
}
