import React, { useState } from "react";
import { IDL } from "../public/solana_movies";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { useRouter } from "next/router";

export default function AddMovie() {
  const router = useRouter();
  const [inputMovieValue, setInputMovieValue] = useState("");
  const programID = new PublicKey(IDL.metadata.address);

  const { SystemProgram, Keypair } = web3;
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

  const stringToBytes = (input) => {
    return new TextEncoder().encode(input);
  };

  const addMovie = async () => {
    if (inputMovieValue.length > 0) {
      console.log("Movie link:", inputMovieValue);

      var provider = getProvider();
      var program = new Program(IDL, programID, provider);
      const [pda] = await PublicKey.findProgramAddress(
        [
          stringToBytes("gif_account"),
          provider.wallet.publicKey.toBytes(),
          stringToBytes(inputMovieValue),
        ],
        program.programId
      );

      await program.rpc.initialize(inputMovieValue, {
        accounts: {
          movieGif: pda,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
      });

      setInputMovieValue("");
      router.push("/");
    } else {
      console.log("Empty input. Try again.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="URL Movie"
          className="mt-8 border rounded p-4"
          onChange={(e) => setInputMovieValue(e.target.value)}
        />
        <button
          onClick={addMovie}
          className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
        >
          Add Movie
        </button>
      </div>
    </div>
  );
}
