<script lang="ts">
import tmdb from '../api/tmdb';

let containerBg: HTMLElement;
let containerImg: HTMLElement;

const { movie, secret, winnerId, onGuess } = $props();

const handlePick = () => {
  // results screen, flush the guess
  if (!secret) return;
	onGuess(movie);
};

// detect update of "secret" to display fx on container bg
$effect(() => {
	if (!secret) {
		if (movie.id === winnerId) {
			// this movie is the better-rated
			containerBg.classList.add('fx-win');
		} else {
			// this movie lost the battle
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
  <div bind:this={containerBg} class="absolute top-0 left-0 min-h-full min-w-full -z-10"></div>
  <button onclick={handlePick} class="flex flex-col items-center justify-center">
    <img bind:this={containerImg} src="{tmdb.imgBaseURL + movie.poster_path}" alt="movie poster" class="movie-img"/>
    <div class="movie-infos rounded-md p-2 mt-3">
      <h2 class="movie-title font-bold text-xl text-center">
        {movie.title}
        <span class="font-light text-sm">({movie.release_date.slice(0, 4)})</span>
      </h2>
      {#if !secret}
        <div>
          {movie.vote_average}
          <span class="font-light text-sm ml-1">({movie.vote_count} votes)</span>
        </div>
      {/if}
    </div>
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

.movie-infos {
  background-color: var(--purple-dark);
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