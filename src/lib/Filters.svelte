<script lang="ts">
let outputVoteAverageGte: number = $state(0);
let outputVoteAverageLte: number = $state(0);
let outputVoteCountGte: number = $state(0);
let outputVoteCountLte: number = $state(0);
let yearGte: number = $state(0);
let yearLte: number = $state(0);
const yearMax = new Date().getFullYear();

// default values
outputVoteAverageGte = 5;
outputVoteAverageLte = 5;
outputVoteCountGte = 500;
outputVoteCountLte = 5000;
yearGte = 1895;
yearLte = yearMax;

const genres: Genre[] = [
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
	{ id: 878, name: 'Science-Fiction' },
	{ id: 10770, name: 'Téléfilm' },
	{ id: 53, name: 'Thriller' },
	{ id: 10752, name: 'Guerre' },
	{ id: 37, name: 'Western' },
];

let buttonClose: HTMLButtonElement;
buttonClose.addEventListener('click', () => {});
</script>

<div class="overlay w-screen h-screen absolute left-0 top-0 flex items-center justify-center z-30">
	<div class="filters flex flex-col p-5 rounded-3xl z-40 relative">
		<button bind:this={buttonClose} class="filters-button w-10 h-10 rounded-full absolute -right-2 -top-2">
			X
		</button>
		<!-- with_genres -->
		<h2 class="filters-title">genre</h2> 
		<div class="filters-group">
			<label for="with_genres">genres : </label>
			<select name="with_genres" id="with_genres">
				{#each genres as genre}
					<option value="{genre.id}">{genre.name}</option>
				{/each}
			</select>
		</div>

		<!-- with_people -->
		<h2 class="filters-title">acteur·ice·s</h2>
		<div class="filters-group">
			<label for="with_people">acteur·ice (séparé·e·s par des virgules) :</label>
			<input type="text" name="with_people" id="with_people"/>
		</div>

		<!-- primary_release_year -->
		<h2 class="filters-title">année de sortie</h2>
		<div class="filters-group">
			<label for="primary_release_date-gte">minimum :</label>
			<input type="number" maxlength="4" min="1895" max="{yearMax}" name="primary_release_date-gte" id="primary_release_date-gte" class="w-20" bind:value={yearGte}/>
		</div>
		<div class="filters-group">
			<label for="primary_release_date-lte">maximum :</label>
			<input type="number" maxlength="4" min="1895" max="{yearMax}" name="primary_release_date-lte" id="primary_release_date-lte" class="w-20" bind:value={yearLte}/>
		</div>

		<!-- vote_average -->
		<h2 class="filters-title">moyenne</h2>
		<div class="filters-group">
			<label for="vote_average-gte">minimum :</label>
			<input type="range" name="vote_average-gte" id="vote_average-gte" min="0" max="10" step=".5" bind:value={outputVoteAverageGte}/>
			<output id="vote_average-gte-output">{outputVoteAverageGte}</output>
		</div>
		<div class="filters-group">
			<label for="vote_average-lte">maximum :</label>
			<input type="range" name="vote_average-lte" id="vote_average-lte" min="0" max="10" step=".5" bind:value={outputVoteAverageLte}/>
			<output id="vote_average-lte-output">{outputVoteAverageLte}</output>
		</div>
		
		<!-- vote_count -->
		<h2 class="filters-title">nombre de votes</h2>
		<div class="filters-group">
			<label for="vote_count-gte">minimum :</label>
			<input type="range" name="vote_count-gte" id="vote_count-gte" min="0" max="5000" step="50" bind:value={outputVoteCountGte}/>
			<output id="vote_count-gte-output">{outputVoteCountGte}</output>
		</div>
		<div class="filters-group">
			<label for="vote_count-lte">maximum :</label>
			<input type="range" name="vote_count-lte" id="vote_count-lte" min="0" max="5000" step="50" bind:value={outputVoteCountLte}/>
			<output id="vote_count-lte-output">{outputVoteCountLte}</output>
		</div>
	</div>
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
	align-items: center;
	margin-bottom: 4px;
	padding-left: 12px;

	input, select {
		outline: none;
		color: var(--purple-dark);
		background-color: var(--yellow);
		border-radius: 99px;
		padding: 4px 10px;
	}
}
</style>