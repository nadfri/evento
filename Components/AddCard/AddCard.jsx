import React from "react";
import styles from "./AddCard.module.scss";

export default function AddCard({ open }) {
  return (
    <div className={styles.AddCard} onClick={open}>
      <button>+</button>
    </div>
  );
}
