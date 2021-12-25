/*Librairies*/
import React, {useState} from "react";
import Head from "next/head";
import moment from "moment";
import { IoTimerSharp } from "react-icons/io5";
import { FaCommentDots } from "react-icons/fa";

/*Components*/
import ModaleNewComment from "../../Components/ModalNewComment/ModalNewComment";

/*CSS*/
import styles from "./event.module.scss";

/*Utils*/
import { connectToDB } from "../../helpers/mongodb";

export default function Event({ event }) {
	const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const date = moment(event.date).format("DD/MM/YYYY");
  const time = moment(event.date).format("HH:mm");
  let color = "";

  if (moment(event.date) < moment().add(10, "days")) {
    color = "#ff0000a1";
  }

  const At = () => <span className={styles.violet}>@</span>;

  return (
    <>
      <Head>
        <title>{event.titre.toUpperCase()}</title>
      </Head>

      <div className={styles.event}>
        <h1>{event.titre}</h1>

        <h2>
          <At />
          {event.organisateur} <a href={`mailto:${event.email}`}>({event.email})</a>
        </h2>

        <h3>
          <IoTimerSharp className={styles.icon} style={{ color }} /> {date} à {time}
        </h3>

        <fieldset>
          <legend>Description</legend>
          {event.description}
        </fieldset>

        <fieldset>
          <legend>Commentaires</legend>
          <ul>
            {event.commentaires ? (
              event.commentaires.map((commentaire, index) => (
                <li key={index}>
                  <div className={styles.auteur}>
                    <At />
                    {commentaire.auteur}
                  </div>
                  <div>{commentaire.commentaire}</div>
                </li>
              ))
            ) : (
              <li style={{ fontStyle: "italic" }}>Pas de commentaires</li>
            )}
          </ul>
        </fieldset>

        <button className={styles.btnComment} onClick={openModal}>
          <span>Commenter</span>
          <FaCommentDots />
        </button>
      </div>
			{modal &&<ModaleNewComment close={closeModal}/>}
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  let event;

  try {
    //Connection à MongoDb
    const client = await connectToDB();
    //Connexion à la base de données
    const db = client.db();
    //Récupération de l'event
    event = await db.collection("events").findOne({ slug: params.event });
  } catch (error) {
    console.log("error", error);
  }

  return {
    props: {
      event: JSON.parse(JSON.stringify(event)),
    },
    revalidate: 60, //refait un build chaque minute
  };
}

export async function getStaticPaths() {
  let paths = [];

  try {
    //Connection à MongoDb
    const client = await connectToDB();
    //Connexion à la base de données
    const db = client.db();
    //Récupération des projets
    paths = await db.collection("events").find().toArray();
  } catch (error) {
    console.log("error", error);
  }

  return {
    paths: paths.map((event) => {
      return {
        params: {
          event: event.slug,
        },
      };
    }),
    fallback: false,
  };
}
