import React from "react";
import styles from "./Card.module.scss";

export default function Card() {
  return (
    <div className={styles.Card}>
      <div className={styles.titleCard}>Nom Événement</div>
      <h2>31/12/2021</h2>
      <h2>12h00</h2>
      <h3>Organisateur</h3>
    </div>
  );
}
