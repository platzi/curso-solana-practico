import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SolanaMovies } from '../target/types/solana_movies';

describe('solana-movies', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolanaMovies as Program<SolanaMovies>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
