import React from "react";
import styles from "./Card.module.scss";
import moment from "moment";

export default function Card({ event }) {

  const date = moment(event.date).format("DD/MM/YYYY");
  const time = moment(event.date).format("HH:mm");
  let color = "";

  // console.log(moment(event.date).add(10,"days").format("DD/MM/YYYY"));

  if(moment(event.date) < moment().add(10,"days")){
    color = 'red';
  }

  

  return (
    <div className={styles.Card}>
      <div className={styles.titleCard}>{event.titre}</div>
      <div className={styles.dateCard} style={{color}}>{date}</div>
      <div className={styles.timeCard}>{time}</div>
      <div className={styles.organizerCard}><span>@</span>{event.organisateur}</div>
    </div>
  );
}
