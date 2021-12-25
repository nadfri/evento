/*Librairies*/
import React from "react";
import moment from "moment";
import Link from "next/link";
import slugify from 'react-slugify';

/*CSS*/
import styles from "./Card.module.scss";

export default function Card({ event }) {
  const date = moment(event.date).format("DD/MM/YYYY");
  const time = moment(event.date).format("HH:mm");
  let color = "";


  if (moment(event.date) < moment().add(10, "days")) {
    color = "red";
  }

  return (
    <Link href={`/${slugify(event.titre)}`}>
      <a>
        <div className={styles.Card}>
          <div className={styles.titleCard}>{event.titre}</div>
          <div className={styles.dateCard} style={{ color }}>
            {date}
          </div>
          <div className={styles.timeCard}>{time}</div>
          <div className={styles.organizerCard}>
            <span>@</span>
            {event.organisateur}
          </div>
        </div>
      </a>
    </Link>
  );
}

