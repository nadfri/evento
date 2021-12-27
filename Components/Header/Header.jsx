/*Librairies*/
import React, { useState } from "react";
import Link from "next/link";

/*Components*/
import ModaleNewEvent from "../ModalNewEvent/ModaleNewEvent";
import { BsPlusLg } from "react-icons/bs";

/*CSS*/
import styles from "./Header.module.scss";

export default function Header() {
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  return (
    <>
      <header className={styles.Header}>
        <Link href="/">
          <a className={styles.logo}>
            EVENTO<span>byStockoss</span>
          </a>
        </Link>
        <button onClick={openModal}>
          AJOUTER <BsPlusLg className={styles.icon} />
        </button>
      </header>
      <BsPlusLg className={styles.iconFixed} onClick={openModal} />
      {modal && <ModaleNewEvent close={closeModal} />}
    </>
  );
}
