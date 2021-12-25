/*Librairies*/
import React, { useRef, useState } from "react";
import {IoClose} from "react-icons/io5";
/*CSS*/
import styles from "./ModalNewEvent.module.scss";

export default function ModaleNewEvent({ close }) {
  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current.style.opacity = 0;
    setTimeout(() => close(), 500);
  };

  /*State*/
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [titre, setTitre] = useState("");
  const [email, setEmail] = useState("");
  const [organisateur, setOrganisateur] = useState("");
  const [description, setDescription] = useState("");

  /*Submit*/
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.ModaleNewEvent} ref={modalRef}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.titleForm}>Ajouter un Événement</div>

        <div className={styles.gridInput}>
          <div className={styles.container_Input}>
            <label htmlFor="date">
              <span>Date</span>
            </label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              id="date"
              required
            />
          </div>
          <div className={styles.container_Input}>
            <label htmlFor="date">
              <span>Heure</span>
            </label>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              id="heure"
              required
            />
          </div>
        </div>

        <div className={styles.containerInput}>
          <input
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            type="text"
            maxLength={60}
            placeholder=" "
            id="titre"
            autoComplete="off"
            required
          />
          <label htmlFor="titre">
            <span>Titre</span>
          </label>
        </div>

        <div className={styles.gridInput}>
          <div className={styles.containerInput}>
            <input
              value={organisateur}
              onChange={(e) => setOrganisateur(e.target.value)}
              type="text"
              placeholder=" "
              id="organisateur"
              autoComplete="off"
              minLength={3}
              required
            />
            <label htmlFor="organisateur">
              <span>Organisateur</span>
            </label>
          </div>
          <div className={styles.containerInput}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder=" "
              autoComplete="off"
              id="email"
              required
            />
            <label htmlFor="email">
              <span>Email</span>
            </label>
          </div>
        </div>

        <div className={styles.containerInput}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            rows="10"
            placeholder=" "
            maxLength="300"
          />
          <label htmlFor="description">
            <span>Description</span>
          </label>
        </div>

        <button>Envoyer</button>

        <div className={styles.close} onClick={closeModal}>
        <IoClose/>
        </div>
      </form>
    </div>
  );
}
