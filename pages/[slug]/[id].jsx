/*Librairies*/
import React, {useState} from "react";
import Head from "next/head";
import moment from "moment";

/*Components*/
import ModaleNewComment from "../../Components/ModalNewComment/ModalNewComment";
import { IoTimerSharp } from "react-icons/io5";
import { FaCommentDots } from "react-icons/fa";

/*CSS*/
import styles from "./event.module.scss";

/*Utils*/
import { connectToDB } from "../../helpers/mongodb";
import { ObjectId } from "mongodb";


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

export async function getServerSideProps(context) {
  const { params } = context;
  //console.log("context", context)
  let event;

  try {
    //Connection à MongoDb
    const client = await connectToDB();
    //Connexion à la base de données
    const db = client.db();
    //Récupération de l'event
    event = await db.collection("events").findOne({ _id: ObjectId(params.id) });
  } catch (error) {
    console.log("error", error);
  }

  if(!event) {
    return {
      notFound: true}
    }


  return {
    props: {
      event: JSON.parse(JSON.stringify(event)),
    }
  };
}

// export async function getStaticPaths() {
//   let events = [];

//   try {
//     //Connection à MongoDb
//     const client = await connectToDB();
//     //Connexion à la base de données
//     const db = client.db();
//     //Récupération des events
//     events = await db.collection("events").find().toArray();
//   } catch (error) {
//     console.log("error", error);
//   }

//   return {
//     paths: events.map(event=> `/${event.slug}/${event._id}`),
//     fallback: false,
//   };
// }
