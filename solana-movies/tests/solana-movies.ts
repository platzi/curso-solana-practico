import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaMovies } from "../target/types/solana_movies";
import { TextEncoder } from "util";
const { PublicKey, SystemProgram } = anchor.web3;

var assert = require("assert");

const stringToBytes = (input: string): Uint8Array => {
  return new TextEncoder().encode(input);
};

describe("solana-movies", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolanaMovies as Program<SolanaMovies>;

  function assertNotNull<T>(v: T | null): T {
    if (!v) throw new Error();

    return v;
  }

  it("Is initialized!", async () => {
    // Add your test here.
    const gifUrl = "https://test.com";

    const [pda] = await PublicKey.findProgramAddress(
      [
        stringToBytes("gif_account"),
        anchor.getProvider().wallet.publicKey.toBytes(),
        stringToBytes(gifUrl),
      ],
      program.programId
    );

    let tx = await program.methods
      .initialize(gifUrl)
      .accounts({
        movieGif: pda,
        user: anchor.getProvider().wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    assertNotNull(tx);
  });

  it("Get all movies", async () => {
    const gifsByOwner = await program.account.movieGif.all();

    assert.equal(1, gifsByOwner.length);
  });

  it("Finds movies by pubkey!", async () => {
    const gifsByOwner = await program.account.movieGif.all([
      {
        memcmp: {
          bytes: anchor.getProvider().wallet.publicKey.toBase58(),
          offset: 8,
        },
      },
    ]);

    assert.equal(1, gifsByOwner.length);
  });
});
