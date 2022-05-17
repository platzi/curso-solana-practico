import "../styles/globals.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    const { solana } = window;

    if (solana) {
      if (solana.isPhantom) {
        console.log("Phantom wallet was found");
        const response = await solana.connect({ onlyIfTrusted: true });
        setWalletAddress(response.publicKey.toString());
      }
    } else {
      console.log("Phatom wallet wasn't found");
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public key: ", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  return (
    <div>
      {!walletAddress && (
        <div className={styles.container}>
          <button
            className={styles.sol_connect_wallet_button}
            onClick={connectWallet}
          >
            Conectarse
          </button>
        </div>
      )}
      <div>
        <main>
          <nav className="border-b p-6">
            <p className="text-4xl font-bold">Platzi Movies</p>
            <div className="flex mt-4">
              <Link href="/">
                <a className="mr-4">Inicio</a>
              </Link>
              <Link href="/add-movie">
                <a className="mr-6">Agregar Películas</a>
              </Link>
              <Link href="/my-movies">
                <a className="mr-6">Mis Películas</a>
              </Link>
            </div>
          </nav>
        </main>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
