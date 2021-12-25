/*Librairies*/
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*Components*/
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BackgroundAnim from "../BackGroundAnim/BackgroundAnim";

/*CSS*/
import styles from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <div className={styles.Layout}>
      <Header />
      <main>{children}</main>
      <Footer/>



      <ToastContainer />
	  <BackgroundAnim/>
    </div>
  );
}
