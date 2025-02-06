<script lang="ts">
import { DEFAULT_FILTERS } from '../types/constants';
import { onMount } from 'svelte';

interface FiltersDialogProps {
	filters: Filterables,
	onClose: () => void,
	onUpdate: (filters: Filterables) => void,
}
const { filters, onClose, onUpdate }: FiltersDialogProps = $props();

let outputPeople: string = $state('');
let outputVoteAverageGte: number = $state(0);
let outputVoteAverageLte: number = $state(0);
let outputVoteCountGte: number = $state(0);
let outputVoteCountLte: number = $state(0);
// biome-ignore lint/style/useConst: need let to bind in svelte
let yearGte: number | undefined = $state();
// biome-ignore lint/style/useConst: need let to bind in svelte
let yearLte: number | undefined = $state();
const yearMax = new Date().getFullYear();

// default values
outputPeople = '';
outputVoteAverageGte = DEFAULT_FILTERS.vote_average_gte.gte as number;
outputVoteAverageLte = DEFAULT_FILTERS.vote_average_gte.lte as number;
outputVoteCountGte = DEFAULT_FILTERS.vote_count_gte.gte as number;
outputVoteCountLte = DEFAULT_FILTERS.vote_count_gte.lte as number;

const genres: Genre[] = [
	{ id: -1, name: 'Tous' },
	{ id: 28, name: 'Action' },
	{ id: 12, name: 'Aventure' },
	{ id: 16, name: 'Animation' },
	{ id: 35, name: 'Comédie' },
	{ id: 80, name: 'Crime' },
	{ id: 99, name: 'Documentaire' },
	{ id: 18, name: 'Drame' },
	{ id: 10751, name: 'Familial' },
	{ id: 14, name: 'Fantastique' },
	{ id: 36, name: 'Histoire' },
	{ id: 27, name: 'Horreur' },
	{ id: 10402, name: 'Musique' },
	{ id: 9648, name: 'Mystère' },
	{ id: 10749, name: 'Romance' },
	{ id: 878, name: 'Sci-Fi' },
	{ id: 10770, name: 'Téléfilm' },
	{ id: 53, name: 'Thriller' },
	{ id: 10752, name: 'Guerre' },
	{ id: 37, name: 'Western' },
];

const handleCheckboxChange = (event: Event): void => {
	const source = event.target as HTMLInputElement;
	if (!source || source.id !== '-1') return;

	const checkboxes: HTMLInputElement[] = Array.from(
		document.querySelectorAll('input[type="checkbox"]'),
	);
	const isource = checkboxes.findIndex((c) => c.id === source.id);
	if (isource > -1) checkboxes.splice(isource, 1);
	if (checkboxes.length > 0) {
		for (const box of checkboxes) {
			box.checked = source.checked;
			box.disabled = source.checked;
		}
	}
};

const getSelectedGenres = (): Genre[] => {
	const checkboxes: HTMLInputElement[] = Array.from(
		document.querySelectorAll('input[type="checkbox"]:checked'),
	);
	// checkbox ALL is selected
	if (checkboxes.findIndex((c) => c.id === '-1') > -1)
		return [{ id: -1, name: 'Tous' }];
	// else compute every checkbox to extract Genre objs
	const selectedGenres = checkboxes.map((c) => ({
		id: +c.id,
		name: c.parentElement ? c.parentElement?.innerText : '',
	}));
	return selectedGenres;
};

const handleClose = (event: Event) => {
	event.preventDefault();
	onClose();
};

const handleUpdate = (event: Event) => {
	event.preventDefault();
	const newFilters: Filterables = {
		with_genres: getSelectedGenres(),
		with_people:
			outputPeople.length > 0
				? outputPeople.split(',').map((w) => w.trim())
				: DEFAULT_FILTERS.with_people,
		primary_release_date_gte: {
			gte: yearGte
				? `${yearGte}-01-01`
				: DEFAULT_FILTERS.primary_release_date_gte.gte,
			lte: yearLte
				? `${yearLte}-12-31`
				: DEFAULT_FILTERS.primary_release_date_gte.lte,
		},
		vote_average_gte: { gte: outputVoteAverageGte, lte: outputVoteAverageLte },
		vote_count_gte: { gte: outputVoteCountGte, lte: outputVoteCountLte },
	};
	onUpdate(newFilters);
	onClose();
};

// load filters passed through params
const loadFilters = filters: Filterables => {
	const genreTous = document.getElementById('-1') as HTMLInputElement;
	genreTous.click();
}

onMount(() => {
	loadFilters();
});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="overlay w-screen h-screen absolute left-0 top-0 flex items-center justify-center z-30">
	<form class="filters flex flex-col p-5 rounded-3xl z-40 relative max-w-xl">

    <!-- close button -->
    <button onclick={handleClose} class="filters-button w-10 h-10 rounded-full absolute -right-2 -top-2">
			X
		</button>

		<!-- with_genres -->
		<h2 class="filters-title">genres</h2> 
		<div class="grid grid-cols-4">
			{#each genres as genre}
				<label for="{`${genre.id}`}" class="filters-group checkbox-container">{genre.name}
					<input type="checkbox" onchange={handleCheckboxChange} id="{`${genre.id}`}" value="{genre.id}"/>
					<span class="checkbox-box"></span>
				</label>
			{/each}
		</div>

		<!-- with_people -->
		<h2 class="filters-title">acteur·ice·s</h2>
		<div class="filters-group flex-col justify-start items-start gap-1">
			<label for="with_people">acteur·ice (séparé·e·s par des virgules) :</label>
			<!-- todo: remove autocomplete on inputs -->
			<input type="text" name="with_people" id="with_people" placeholder="ex: Lennifer Jawrance; Thimoté Chalumeau, Gady Lala, Perdo Pacsal, Banny Doon" class="w-full" bind:value={outputPeople}/>
		</div>

		<!-- primary_release_year -->
		<h2 class="filters-title">année de sortie</h2>
		<div class="flex flex-row flex-wrap justify-evenly">
			<div class="filters-group items-center">
				<label for="primary_release_date-gte" class="mr-1">min :</label>
				<input type="number" maxlength="4" min="1895" max="{yearMax}" placeholder="ex: 1895" name="primary_release_date-gte" id="primary_release_date-gte" class="w-28" bind:value={yearGte}/>
			</div>
			<div class="filters-group items-center">
				<label for="primary_release_date-lte" class="mr-1">max :</label>
				<input type="number" maxlength="4" min="1895" max="{yearMax}" placeholder="ex: {yearMax}" name="primary_release_date-lte" id="primary_release_date-lte" class="w-28" bind:value={yearLte}/>
			</div>
		</div>

		<!-- vote_average -->
		<!-- todo: ensure min <= max in all input range -->
		<h2 class="filters-title">moyenne</h2>
		<div class="flex flex-row flex-wrap justify-evenly">
			<div class="filters-group flex-col items-center">
				<span>
					<label for="vote_average-gte">min :</label>
					<output id="vote_average-gte-output">{outputVoteAverageGte}</output>
				</span>
				<input type="range" name="vote_average-gte" id="vote_average-gte" min="0" max="10" step=".5" bind:value={outputVoteAverageGte}/>
			</div>
			<div class="filters-group flex-col items-center">
				<span>
					<label for="vote_average-lte">max :</label>
					<output id="vote_average-lte-output">{outputVoteAverageLte}</output>
				</span>
				<input type="range" name="vote_average-lte" id="vote_average-lte" min="0" max="10" step=".5" bind:value={outputVoteAverageLte}/>
			</div>
		</div>
		
		<!-- vote_count -->
		<h2 class="filters-title">nombre de votes</h2>
		<div class="flex flex-row flex-wrap justify-evenly">
			<div class="filters-group flex-col items-center">
				<span>
					<label for="vote_count-gte">min :</label>
					<output id="vote_count-gte-output">{outputVoteCountGte}</output>
				</span>
				<input type="range" name="vote_count-gte" id="vote_count-gte" min="0" max="5000" step="50" bind:value={outputVoteCountGte}/>
			</div>
			<div class="filters-group flex-col items-center">
				<span>
					<label for="vote_count-lte">max :</label>
					<output id="vote_count-lte-output">{outputVoteCountLte}</output>
				</span>
				<input type="range" name="vote_count-lte" id="vote_count-lte" min="0" max="5000" step="50" bind:value={outputVoteCountLte}/>
			</div>
		</div>

    <button onclick={handleUpdate} class="filters-button rounded-3xl py-3 mt-2 w-44 self-center uppercase">valider</button>
	</form>
</div>

<style>
.overlay {
	background-color: rgba(0,0,0,0.5);
}
.filters {
	color: white;
	background-color: var(--purple-accent);
	box-shadow: 8px 8px var(--pink);
  margin-inline: auto;
  width: fit-content;
	height: fit-content;
}
.filters-button {
	font-family: "Modak";
	background-color: var(--yellow);
	color: var(--purple-accent);
}
.filters-title {
	margin: 12px 0 10px 0;
	font-family: 'Modak';
	font-size: large;
	text-transform: uppercase;
}
.filters-group {
	display: flex;
	margin-bottom: 4px;
	padding-left: 12px;

	input {
		outline: none;
		color: white;
		background-color: var(--pink);
		border-radius: 99px;
		padding: 4px 10px;
	}

	input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	output {
		font-family: "04b_30";
		font-size: smaller;
	}
}

/* CHECKBOX */
.checkbox-container {
	position: relative;
	cursor: pointer;
	padding-left: 20px;

	/* hide default */
	input {
		cursor: pointer;
		position: absolute;
		opacity: 0;
		height: 0;
		width: 0;
	}
	/* create a custom */
	.checkbox-box {
		position: absolute;
		top: 4px;
		left: 0;
		height: 16px;
		width: 16px;
		background-color: var(--purple-dark);
	}
	/* when input is checked > show box */
	input:checked ~ .checkbox-box:after {
		display: block;
	}
	/* style for the box */
	.checkbox-box:after {
		left: 6px;
		top: 2px;
		width: 5px;
		height: 10px;
		border: solid var(--yellow);
		border-width: 0 2px 2px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
	/* checked */
	input:checked ~ .checkbox-box {
		background-color: var(--pink);
	}
	/* disabled */
	input:disabled {
		~ .checkbox-box {
			filter: brightness(.7);
		}
	}
}
/* hover box */
.checkbox-container:hover input ~ .checkbox-box {
  cursor: pointer;
}
/* element whose border does the check */
.checkbox-box:after {
  content: "";
  position: absolute;
  display: none;
}
</style>