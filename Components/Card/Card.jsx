import React from "react";
import styles from "./Card.module.scss";

export default function Card() {
  return (
    <div className={styles.Card}>
      <div className={styles.titleCard}>Nom Événement</div>
      <div className={styles.dateCard}>31/12/2021</div>
      <div className={styles.timeCard}>12h00</div>
      <div className={styles.organizerCard}>Organisateur</div>
    </div>
  );
}
