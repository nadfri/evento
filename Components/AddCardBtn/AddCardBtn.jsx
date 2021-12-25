/*Librairies*/
import React from "react";
import { BsPlusLg } from "react-icons/bs";

/*CSS*/
import styles from "./AddCardBtn.module.scss";

export default function AddCardBtn({ open }) {
  return (
    <div className={styles.AddCardBtn} onClick={open}>
      <button>
        <BsPlusLg />
      </button>
    </div>
  );
}
