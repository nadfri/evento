/*Librairies*/
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundAnim from "../BackGroundAnim/BackgroundAnim";
import Header from "../Header/Header";

/*Components*/

/*CSS*/
import styles from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <div className={styles.Layout}>
      <Header />
      <main>{children}</main>



      <ToastContainer />
	  <BackgroundAnim/>
    </div>
  );
}
