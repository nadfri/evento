/*Librairies*/
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

/*Components*/
import { IoClose } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import toastNotify from "../../helpers/toastNotify";

/*CSS*/
import styles from "../ModalNewEvent/ModalNewEvent.module.scss";

export default function ModaleNewComment({ close }) {
  const modalRef = useRef(null);
  const router = useRouter();

  const closeModal = () => {
    modalRef.current.style.opacity = 0;
    setTimeout(() => close(), 500);
  };

  /*State*/
  const [auteur, setAuteur] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);

  /*Submit*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorAPI(null);

    const formData = {
      auteur,
      commentaire,
      id: router.query.id,
    };

    const response = await fetch("/api/newComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = (await response?.json()) || null;

    if (!response || !response.ok) {
      setErrorAPI(data?.message || "Erreur API");
      console.log(data?.message || "Erreur API");
      toastNotify("error");
      setIsLoading(false);
    } else {
      closeModal();
      toastNotify("success");
      //Reload only if the comment is added
      router.replace(router.asPath);
    }
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
            minLength={3}
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

        {isLoading ? (
          <button disabled>
            Ajout en cours <BiLoaderAlt />
          </button>
        ) : (
          <button>Commenter</button>
        )}

        <div className={styles.close} onClick={closeModal}>
          <IoClose />
        </div>
      </form>
    </div>
  );
}
