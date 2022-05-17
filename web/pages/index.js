import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const MOVIES = ["https://bit.ly/3Jb3ae2", "https://bit.ly/3NOj69w"];

  useEffect(() => {
    setMovies(MOVIES);
  });

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {movies.map((movie, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img style={{ height: "20rem" }} src={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
