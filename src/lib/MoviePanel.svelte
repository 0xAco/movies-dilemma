<script lang="ts">
import tmdb from '../api/tmdb';

let container: HTMLElement;

const { movie, secret, result, onGuess } = $props();

const handlePick = () => {
	onGuess(movie);
};

// detect secret update to display img on container bg
</script>

<div bind:this={container} class="movie min-h-full flex flex-col items-center justify-center">
  <button onclick={handlePick} class="flex flex-col items-center justify-center">
    <img src="{tmdb.imgBaseURL + movie.poster_path}" alt="movie poster" class="movie-img"/>
    <h2 class="movie-title font-bold text-xl mt-4 text-center">{movie.title}</h2>
    {#if !secret}
      <div>{movie.vote_average} ({movie.vote_count})</div>
    {/if}
  </button>
</div>

<style>
.movie-img {
  border-radius: 20px;
  box-shadow: 8px 8px var(--blue);
}
</style>