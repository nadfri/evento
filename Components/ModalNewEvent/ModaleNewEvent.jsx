import React, { useRef } from "react";
import styles from "./ModalNewEvent.module.scss";

export default function ModaleNewEvent({ close }) {
  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current.style.opacity = 0;
    setTimeout(() => close(), 500);
  };

  return (
    <div className={styles.ModaleNewEvent} ref={modalRef}>
      <form className={styles.form}>
        <div className={styles.titleForm}>Ajouter un Événement</div>

        <div className={styles.container_Input}>
          <label htmlFor="date">
            <span>Date</span>
          </label>
          <input
            type="datetime-local"
            placeholder=" "
            autoComplete="off"
            id="date"
            required
          />
        </div>

        <div className={styles.containerInput}>
          <input type="text" placeholder=" " id="titre" autoComplete="off" required />
          <label htmlFor="titre">
            <span>Titre</span>
          </label>
        </div>

        <div className={styles.gridInput}>
          <div className={styles.containerInput}>
            <input
              type="text"
              placeholder=" "
              id="organisateur"
              autoComplete="off"
              required
            />
            <label htmlFor="organisateur">
              <span>Organisateur</span>
            </label>
          </div>
          <div className={styles.containerInput}>
            <input type="email" placeholder=" " autoComplete="off" id="email" required />
            <label htmlFor="email">
              <span>Email</span>
            </label>
          </div>
        </div>

        <div className={styles.containerInput}>
          <textarea rows="10" placeholder=" " maxLength="300" />
          <label>
            <span>Description</span>
          </label>
        </div>

        <button>Envoyer</button>

        <div className={styles.close} onClick={closeModal}>+</div>
      </form>
    </div>
  );
}
