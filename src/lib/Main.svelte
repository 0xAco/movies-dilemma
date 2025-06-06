<script lang="ts">
import { onMount } from 'svelte';
import tmdb from '../api/tmdb';
import MoviePanel from './MoviePanel.svelte';
import FiltersDialog from './FiltersDialog.svelte';
import FiltersRecap from './FiltersRecap.svelte';
import { DEFAULT_FILTERS, EMPTY_DISCOVER, DEFAULT_DISCOVER } from '../types/constants';

const responseDefault: Discover = $state(DEFAULT_DISCOVER);
const emptyDiscover: Discover = EMPTY_DISCOVER;
let response: Discover = $state(responseDefault);
let mov1: Movie | null = $state(null);
let mov2: Movie | null = $state(null);
let guessing = $state(true);
let winnerId: number | null = $state(null);
let filterOpen: boolean = $state(true);
let filters: Filterables = $state(DEFAULT_FILTERS);
let streak: number = $state(0);

const randomIndex = (limit: number) => {
	return Math.floor(Math.random() * limit);
};

const matchmake = (movies: Movie[]) => {
	guessing = true;
	const indexMov1 = randomIndex(movies.length - 1);
	let indexMov2 = randomIndex(movies.length - 1);
	while (indexMov1 === indexMov2) indexMov2 = randomIndex(movies.length - 1);
	mov1 = movies[indexMov1];
	mov2 = movies[indexMov2];
	winnerId = mov1.vote_average > mov2.vote_average ? mov1.id : mov2.id;
};

const showResults = (movie: Movie) => {
	// cant guess if no movie is loaded
	if (!mov1 || !mov2) return;
	const isAnswerRight =
		movie.vote_average >= mov1.vote_average &&
		movie.vote_average >= mov2.vote_average;
	guessing = false;

	// results reveal
	if (isAnswerRight) {
		streak = (streak >= 0 ? streak + 1 : 1);
	} else {
		streak = (streak <= 0 ? streak - 1 : -1);
		// 10% chance to fart
		let fartCry: number = 100;
		if (Math.random() < (fartCry / 100)) {
			// shuffle farts
			const farts = [
				new Audio('sounds/498.mp3'),
				new Audio('sounds/500.mp3'),
				new Audio('sounds/503.mp3'),
			].sort((a, b) => 0.5 - Math.random());
			// launch
			farts[0].play();
		}
		// plus tu es nul, plus on te pète dessus
		// todo: système de streak
	}
};

const openFilters = () => {
	filterOpen = true;
};

const closeFilters = () => {
	filterOpen = false;
};

const refreshFilters = (updatedFilters: Filterables) => {
	filters = updatedFilters;
	matchmake(response.results);
};

onMount(async () => {
	// const auth = await tmdb.auth();
	// response = await tmdb.discover(filters);
	matchmake(response.results);
});
</script>

<main class="flex flex-col flex-grow">
	<button onclick={openFilters} class="filters-button absolute right-4 top-4 rounded-xl p-4 uppercase">
		gérer les filtres
	</button>
	{#if filterOpen}
    <FiltersDialog {filters} onClose={closeFilters} onUpdate={refreshFilters}/>
  {/if}
  {#if JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)}
    <FiltersRecap filters={filters}/>
  {/if}
	<div class="band flex items justify-center m-2">
		<div class="streak min-w-10 min-h-10 p-4 rounded-3xl font-bold">Streak : {streak}</div>
	</div>
	{#if response.results.length > 0 && mov1 && mov2}
		<div class="splitview flex flex-grow items-center w-auto">
			<div class="left flex-1">
				<MoviePanel movie={mov1} secret={guessing} {winnerId} onGuess={showResults}/>
			</div>
			<div class="separator h-[33rem] rounded-3xl flex items-center justify-center w-1 z-10">
				<p class="separator-text text-xl bg-inherit min-w-10 min-h-10 rounded-full transition hover:rotate-[360deg] text-center leading-10 cursor-default">OR</p>
			</div>
			<div class="right flex-1">
				<MoviePanel movie={mov2} secret={guessing} {winnerId} onGuess={showResults}/>
			</div>
		</div>
	{:else}
		<div>ALERTE CABINET</div>
	{/if}
</main>

<style>
	.streak {
		background-color: var(--pink);
	}
	.separator {
		background-color: var(--pink);
	}
	.separator-text {
		font-family: "Modak";
	}
  .filters-button {
    background-color: var(--yellow);
    color: var(--purple-accent);
    box-shadow: 6px 6px var(--pink);
    font-family: 'Modak';
  }
</style>