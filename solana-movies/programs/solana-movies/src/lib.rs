use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solana_movies {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, gif_url: String) -> Result<()> {
        let movie_gif = &mut ctx.accounts.movie_gif;
        movie_gif.owner = ctx.accounts.user.key();
        movie_gif.gif_url = gif_url;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(gif_url: String)]
pub struct Initialize<'info> {
    #[account(init, seeds = [b"gif_account", user.key().as_ref(), 
    gif_url.as_bytes()], bump, payer = user, space = 8+32+gif_url.as_bytes().len()+4)]
    pub movie_gif: Account<'info, MovieGif>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct MovieGif {
    pub owner: Pubkey,
    pub gif_url: String,
}
