import React from "react";
import styles from "./Header.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.Header}>
      <Link href="/">
        <a className={styles.logo}>EVENTO<span>byStockoss</span></a>
      </Link>
    </header>
  );
}
