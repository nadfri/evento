/*Librairies*/
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*Components*/

/*CSS*/ 
import styles from './Layout.module.scss';


export default function Layout({ children }) {

	return (
		<div className={styles.Layout}>

			<main>{children}</main>

			<ToastContainer />
		</div>
	);
}