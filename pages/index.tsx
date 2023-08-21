import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
  return (
      <div className={styles.container}>
        <img src="/images/homecover.jpg" alt="Bridge 23" className={styles.centeredImage} />
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>Bridge 23 Geography</h1>
          <p>Bridge 23 nextGen POS system for upgraded customer experience.</p>
        </div>
      </div>
  );
};


export default Home;

