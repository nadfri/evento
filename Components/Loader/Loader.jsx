import React from "react";
import Image from 'next/image';
import loaderSVG from "../../public/loader.svg";
import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.Loader}>
      <Image src={loaderSVG} height={100} width={100} alt="loading..." />
    </div>
  );
}
