/*Librairies*/
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

/*CSS*/
import styles from "../ModalNewEvent/ModalNewEvent.module.scss"

export default function ModaleNewComment({ close }) {
  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current.style.opacity = 0;
    setTimeout(() => close(), 500);
  };

  /*State*/
  const [auteur, setAuteur] = useState("");
  const [commentaire, setCommentaire] = useState("");

  /*Submit*/
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className={styles.ModaleNewEvent} ref={modalRef}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.titleForm}>Ajouter un Commentaire</div>

        <div className={styles.containerInput}>
          <input
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            type="text"
            maxLength={20}
            placeholder=" "
            id="auteur"
            autoComplete="off"
            required
          />
          <label htmlFor="auteur">
            <span>Auteur</span>
          </label>
        </div>

        <div className={styles.containerInput}>
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            id="commentaire"
            rows="5"
            placeholder=" "
            maxLength={140}
          />
          <label htmlFor="commentaire">
            <span>Commentaire</span>
          </label>
        </div>

        <button>Envoyer</button>

        <div className={styles.close} onClick={closeModal}>
          <IoClose />
        </div>
      </form>
    </div>
  );
}
