import Head from "next/head";
import MolecularDnaAnimation from "@/components/diagnostico/MolecularDnaAnimation";
import styles from "./adn-animation.module.css";

export default function AdnAnimationPage() {
  return (
    <>
      <Head>
        <title>ADN molecular loop | Aida Qui</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.page}>
        <MolecularDnaAnimation
          className={styles.frame}
          respectReducedMotion={false}
        />
      </main>
    </>
  );
}
