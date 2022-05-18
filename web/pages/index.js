import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import React, { useEffect, useState } from "react";
import { IDL } from "../public/solana_movies";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";

export default function Home() {
  const [movies, setMovies] = useState([]);

  const programID = new PublicKey(IDL.metadata.address);

  const network = clusterApiUrl("devnet");
  const opts = {
    preflightCommitment: "processed",
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const getMovieList = async () => {
    try {
      const provider = getProvider();
      const program = new Program(IDL, programID, provider);
      const getAllMovies = await program.account.movieGif.all();
      setMovies(getAllMovies);
    } catch (error) {
      console.log("Error in getGifList: ", error);
      setMovies(null);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {movies.map((movie, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img style={{ height: "20rem" }} src={movie.account.gifUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
