<script lang="ts">
import tmdb from '../api/tmdb';

// biome-ignore lint/style/useConst: self assigned by svelte through bind
let containerBg: HTMLElement;
let containerImg: HTMLElement;

const { movie, secret, winnerId, onGuess } = $props();

const handlePick = () => {
	onGuess(movie);
};

// detect secret update to display img on container bg
$effect(() => {
	if (!secret) {
		if (movie.id === winnerId) {
			// this movie is the better-rated
			console.log('win: ', movie.title);
			containerBg.classList.add('fx-win');
		} else {
			// this movie lost the battle
			console.log('lose: ', movie.title);
			containerImg.classList.add('fx-lose');
		}
	} else {
		// reset fx
		containerBg.classList.remove('fx-win');
		containerImg.classList.remove('fx-lose');
	}
});
</script>

<div class="movie min-h-full flex flex-col items-center justify-center relative">
  <div bind:this={containerBg} class="absolute top-0 left-0 h-full w-full -z-10"></div>
  <button onclick={handlePick} class="flex flex-col items-center justify-center">
    <img bind:this={containerImg} src="{tmdb.imgBaseURL + movie.poster_path}" alt="movie poster" class="movie-img"/>
    <h2 class="movie-title font-bold text-xl mt-4 text-center">{movie.title}</h2>
    {#if !secret}
      <div>{movie.vote_average} ({movie.vote_count})</div>
    {/if}
  </button>
</div>

<style>
@keyframes barrel-roll {
  to {
    transform:rotate(360deg);
  }
}

@keyframes fade {
  to {
    filter: saturate(20)
      grayscale(1);
  }
}

.movie-img {
  border-radius: 20px;
  box-shadow: 8px 8px var(--blue);
}

:global(.fx-win) {
  background-image: url('light-rays.png');
  background-repeat: no-repeat;
  background-position: 50%;
  animation: 60s linear infinite barrel-roll;
}

:global(.fx-lose) {
  animation: 1.5s forwards 1 fade;
}
</style>