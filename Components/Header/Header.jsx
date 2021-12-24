import React, {useState} from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import ModaleNewEvent from "../ModalNewEvent/ModaleNewEvent";

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
          AJOUTER <span>+</span>
        </button>
      </header>
      {modal && <ModaleNewEvent close={closeModal} />}
    </>
  );
}
