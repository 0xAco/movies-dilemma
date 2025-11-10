<script lang="ts">
import { onMount } from 'svelte';
import tmdb from '../api/tmdb';
import storage from '../api/localStorage';
import MoviePanel from './MoviePanel.svelte';
import FiltersDialog from './FiltersDialog.svelte';
import FiltersRecap from './FiltersRecap.svelte';
import {
	DEFAULT_FILTERS,
	EMPTY_DISCOVER,
	DEFAULT_DISCOVER,
} from '../types/constants';

let overlayElement: HTMLElement;
// const responseDefault: Discover = $state(DEFAULT_DISCOVER);
const emptyDiscover: Discover = EMPTY_DISCOVER;
let response: Discover = $state(emptyDiscover);
let mov1: Movie | null = $state(null);
let mov2: Movie | null = $state(null);
let secret = $state(true);
let winnerId: number | null = $state(null);
let filterOpen: boolean = $state(false);
let filters: Filterables = $state(DEFAULT_FILTERS);
let streak: number = $state(0);
let initialHigh: string | null = storage.getItem('highscore');
let initialLow: string | null = storage.getItem('lowscore');
let highScore: number = $state(initialHigh ? + initialHigh : 0);
let lowScore: number = $state(initialLow ? + initialLow : 0);

const randomIndex = (limit: number) => {
	return Math.floor(Math.random() * limit);
};

const fetchFilms = async (filters: Filterables) => {
	return await tmdb.discover(filters);
}

const matchmake = (movies: Movie[]) => {
	const indexMov1 = randomIndex(movies.length - 1);
	let indexMov2 = randomIndex(movies.length - 1);
	while (indexMov1 === indexMov2) indexMov2 = randomIndex(movies.length - 1);
	mov1 = movies[indexMov1];
	mov2 = movies[indexMov2];
	winnerId = mov1.vote_average > mov2.vote_average ? mov1.id : mov2.id;
};

// updates the streak and stores it into local storage
const updateStreak = (win: boolean) => {
	if (win) {
		streak = streak >= 0 ? streak + 1 : 1;
		if (streak > highScore) {
			highScore = streak;
			storage.addOrUpdate('highscore', `${streak}`);
		}
	} else {
		streak = streak <= 0 ? streak - 1 : -1;
		if (streak < lowScore) {
			lowScore = streak;
			storage.addOrUpdate('lowscore', `${streak}`);
		}
	}
}

const showResults = (movie: Movie) => {
	// cant guess if no movie is loaded
	if (!mov1 || !mov2) return;
	const isAnswerRight = movie.id === winnerId;
	
	// results reveal
	if (isAnswerRight) {
		if (secret) updateStreak(true);
	} else {
		if (secret) updateStreak(false);
		// 5% chance to fart, +10 at each mistake
		// the worse you are, the more you get farted on
		const fartCry: number = -streak * 10 + 5;
		if (Math.random() < fartCry / 100) {
			// shuffle farts
			const farts = [
				new Audio('sounds/498.mp3'),
				new Audio('sounds/500.mp3'),
				new Audio('sounds/503.mp3'),
			].sort((a, b) => 0.5 - Math.random());
			// launch
			farts[0].play();
		}
	}

	secret = false;
	overlayElement.classList.add('z-50');
};

const openFilters = () => {
	filterOpen = true;
};

const closeFilters = () => {
	filterOpen = false;
};

const refreshFilters = async (updatedFilters: Filterables) => {
	filters = updatedFilters;
	response = await fetchFilms(filters);
	matchmake(response.results);
};

const handleClick = (event: Event) => {
	event.preventDefault();
	if (!secret) {
		// results screen -> find another match
		matchmake(response.results);
		secret = true;
		overlayElement.classList.remove('z-50');
	}
};

onMount(async () => {
	const auth = await tmdb.auth();
	if (auth) response = await fetchFilms(filters);
	matchmake(response.results);
	secret = true;
});
</script>

<main class="flex flex-col flex-grow">
	<a bind:this={overlayElement} href="/" onclick={handleClick} role="button" aria-label="overlay for results" class="fixed top-0 bottom-0 right-0 left-0 -z-50 cursor-default"></a>
	<button onclick={openFilters} class="filters-button absolute right-4 top-4 rounded-xl p-4 uppercase">
		gérer les filtres
	</button>
	{#if filterOpen}
		<FiltersDialog {filters} onClose={closeFilters} onUpdate={refreshFilters}/>
	{/if}
	{#if JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)}
		<FiltersRecap filters={filters}/>
	{/if}
	<div class="band flex justify-center items-center m-2">
		<div class="streak streak--min relative rounded-l-2xl min-w-28 min-h-8 text-right p-2 pr-5 -z-10">lowest : {lowScore}</div>
		<div class="streak streak--current rounded-full min-w-32 min-h-10 text-center p-4 font-bold text-lg">Score : {streak}</div>
		<div class="streak streak--max relative rounded-r-2xl min-w-28 min-h-8 text-left p-2 pl-5 -z-10">highest : {highScore}</div>
	</div>
	{#if response.results.length > 0 && mov1 && mov2}
		<div class="splitview flex flex-grow items-center w-auto">
			<div class="left flex-1">
				<MoviePanel movie={mov1} {secret} {winnerId} onGuess={showResults}/>
			</div>
			<div class="separator h-[33rem] rounded-3xl flex items-center justify-center w-1 z-10">
				<p class="separator-text text-xl bg-inherit min-w-10 min-h-10 rounded-full transition hover:rotate-[360deg] text-center leading-10 cursor-default">OR</p>
			</div>
			<div class="right flex-1">
				<MoviePanel movie={mov2} {secret} {winnerId} onGuess={showResults}/>
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
	.streak--min {
		right: -.8rem;
	}
	.streak--current {
		border: solid 5px var(--purple-dark);
	}
	.streak--max {
		left: -.8rem;
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