/*Librairies*/
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import slugify from "react-slugify";
import { toast } from 'react-toastify';

/*Components*/
import { IoClose } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

/*CSS*/
import styles from "./ModalNewEvent.module.scss";
import Loader from "../Loader/Loader";

export default function ModaleNewEvent({ close }) {
  const modalRef = useRef(null);
  const router = useRouter();
  const toastId = "toastId";

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  /*Detect route changin, launch loader*/
  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  /*Submit*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorAPI(null);

    const formData = {
      titre,
      slug: slugify(titre),
      date,
      time,
      email,
      organisateur,
      description,
    };

    const response = await fetch("/api/newEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      setErrorAPI(data.message || "Erreur API");
      setIsLoading(false);
      setIsFailed(true);
    } else {
      console.log(data.message);
      // setIsLoading(false);
      setIsSuccess(true);
      closeModal();
      //redirect to slug
      router.replace(`/${formData.slug}`);
    }
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
            placeholder=" "
            maxLength="300"
          />
          <label htmlFor="description">
            <span>Description</span>
          </label>
        </div>

        {isLoading ? (
          <button disabled>
            Ajout en cours <BiLoaderAlt />
          </button>
        ) : (
          <button>Ajouter</button>
        )}

        <div className={styles.close} onClick={closeModal}>
          <IoClose />
        </div>
      </form>
      {isLoading && <Loader />}

      {isSuccess &&
        toast.success("Événement ajouté!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
          toastId,
        })}
      {isFailed &&
        toast.error("Erreur API, Veuillez réessayer...", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
          toastId,
        })}
    </div>
  );
}
