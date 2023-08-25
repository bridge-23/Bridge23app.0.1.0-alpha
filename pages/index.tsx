import { NextPage } from "next";
import styles from "../styles/Home.module.css";
//import { useState } from "react";

const Home: NextPage = () => {
  return (
      <div className={styles.container}>

          <div className={styles.container}>
          <h1 className={styles.title}>JOIN TODAY - DO YOUR PURCHASES COUNT!</h1>

                <p>Bridge 23 is a nextGen POS system for upgraded customer experience. It is a blockchain based POS system that allows merchants to accept crypto payments and rewards customers with crypto.</p>
            </div>

      </div>
  );
};

//<img src="/images/homecover.jpg" alt="Bridge 23" className={styles.centeredImage} />

export default Home;

