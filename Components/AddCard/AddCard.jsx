/*Librairies*/
import React from "react";
import {BsPlusLg} from "react-icons/bs";

/*CSS*/
import styles from "./AddCard.module.scss";

export default function AddCard({ open }) {
  return (
    <div className={styles.AddCard} onClick={open}>
      <button><BsPlusLg/></button>
    </div>
  );
}
