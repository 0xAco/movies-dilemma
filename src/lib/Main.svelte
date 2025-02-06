<script lang="ts">
import { onMount } from 'svelte';
import tmdb from '../api/tmdb';
import MoviePanel from './MoviePanel.svelte';
import FiltersDialog from './FiltersDialog.svelte';
import FiltersRecap from './FiltersRecap.svelte';
import { DEFAULT_FILTERS } from '../types/constants';

const response: Discover = $state({
	page: 1,
	results: [
		{
			adult: false,
			backdrop_path: '/cjEcqdRdPQJhYre3HUAc5538Gk8.jpg',
			genre_ids: [28, 14, 35],
			id: 845781,
			original_language: 'en',
			original_title: 'Red One',
			overview:
				"After Santa Claus (codename: Red One) is kidnapped, the North Pole's Head of Security must team up with the world's most infamous tracker in a globe-trotting, action-packed mission to save Christmas.",
			popularity: 6140.642,
			poster_path: '/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg',
			release_date: '2024-10-31',
			title: 'Red One',
			video: false,
			vote_average: 6.963,
			vote_count: 1203,
		},
		{
			adult: false,
			backdrop_path: '/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg',
			genre_ids: [28, 878, 12, 53],
			id: 912649,
			original_language: 'en',
			original_title: 'Venom: The Last Dance',
			overview:
				"Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
			popularity: 4438.575,
			poster_path: '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
			release_date: '2024-10-22',
			title: 'Venom: The Last Dance',
			video: false,
			vote_average: 6.782,
			vote_count: 1805,
		},
		{
			adult: false,
			backdrop_path: '/oHPoF0Gzu8xwK4CtdXDaWdcuZxZ.jpg',
			genre_ids: [12, 10751, 18, 16],
			id: 762509,
			original_language: 'en',
			original_title: 'Mufasa: The Lion King',
			overview:
				'Told in flashbacks, Mufasa is an orphaned cub, lost and alone until he meets a sympathetic lion named Taka—the heir to a royal bloodline. The chance meeting sets in motion a journey of misfits searching for their destiny and working together to evade a threatening and deadly foe.',
			popularity: 3060.267,
			poster_path: '/lurEK87kukWNaHd0zYnsi3yzJrs.jpg',
			release_date: '2024-12-18',
			title: 'Mufasa: The Lion King',
			video: false,
			vote_average: 7.1,
			vote_count: 159,
		},
		{
			adult: false,
			backdrop_path: '/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg',
			genre_ids: [16, 12, 10751, 35],
			id: 1241982,
			original_language: 'en',
			original_title: 'Moana 2',
			overview:
				"After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
			popularity: 2817.589,
			poster_path: '/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg',
			release_date: '2024-11-21',
			title: 'Moana 2',
			video: false,
			vote_average: 6.953,
			vote_count: 581,
		},
		{
			adult: false,
			backdrop_path: '/rhc8Mtuo3Kh8CndnlmTNMF8o9pU.jpg',
			genre_ids: [28, 9648, 53],
			id: 1005331,
			original_language: 'en',
			original_title: 'Carry-On',
			overview:
				'An airport security officer races to outsmart a mysterious traveler forcing him to let a dangerous item slip onto a Christmas Eve flight.',
			popularity: 2554.211,
			poster_path: '/sjMN7DRi4sGiledsmllEw5HJjPy.jpg',
			release_date: '2024-12-05',
			title: 'Carry-On',
			video: false,
			vote_average: 7,
			vote_count: 808,
		},
		{
			adult: false,
			backdrop_path: '/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg',
			genre_ids: [878, 12, 35, 10751],
			id: 939243,
			original_language: 'en',
			original_title: 'Sonic the Hedgehog 3',
			overview:
				'Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.',
			popularity: 2200.927,
			poster_path: '/nyEr1VqvKx1YiesMC3oTB2fZvpY.jpg',
			release_date: '2024-12-19',
			title: 'Sonic the Hedgehog 3',
			video: false,
			vote_average: 8,
			vote_count: 62,
		},
		{
			adult: false,
			backdrop_path: '/au3o84ub27qTZiMiEc9UYzN74V3.jpg',
			genre_ids: [28, 878, 53],
			id: 1035048,
			original_language: 'en',
			original_title: 'Elevation',
			overview:
				'A single father and two women venture from the safety of their homes to face monstrous creatures to save the life of a young boy.',
			popularity: 1386.513,
			poster_path: '/uQhYBxOVFU6s9agD49FnGHwJqG5.jpg',
			release_date: '2024-11-07',
			title: 'Elevation',
			video: false,
			vote_average: 6.3,
			vote_count: 186,
		},
		{
			adult: false,
			backdrop_path: '/sQbFupSWM9wUdPj96NZNUOFSP5.jpg',
			genre_ids: [28, 12, 53],
			id: 1000075,
			original_language: 'fr',
			original_title: "Largo Winch: Le prix de l'argent",
			overview:
				"Largo Winch, devastated by the kidnapping of his son, realizes that if he finds those responsible for his bankruptcy, maybe he'll see his son again.",
			popularity: 1181.322,
			poster_path: '/hextHjNWD79MAJWux4ScvvzUdrR.jpg',
			release_date: '2024-07-31',
			title: 'The Price of Money: A Largo Winch Adventure',
			video: false,
			vote_average: 5.634,
			vote_count: 56,
		},
		{
			adult: false,
			backdrop_path: '/6lE2e6j8qbtQR8aHxQNJlwxdmKV.jpg',
			genre_ids: [28, 80, 53],
			id: 974453,
			original_language: 'en',
			original_title: 'Absolution',
			overview:
				'An aging ex-boxer gangster working as muscle for a Boston crime boss receives an upsetting diagnosis.  Despite a faltering memory, he attempts to rectify the sins of his past and reconnect with his estranged children. He is determined to leave a positive legacy for his grandson, but the criminal underworld isn’t done with him and won’t loosen their grip willingly.',
			popularity: 1126.387,
			poster_path: '/cNtAslrDhk1i3IOZ16vF7df6lMy.jpg',
			release_date: '2024-10-31',
			title: 'Absolution',
			video: false,
			vote_average: 6.1,
			vote_count: 154,
		},
		{
			adult: false,
			backdrop_path: '/dWkdmxIkH9y23s9v1PjQFhTGIwo.jpg',
			genre_ids: [28, 18, 53],
			id: 1043905,
			original_language: 'en',
			original_title: 'Dirty Angels',
			overview:
				"During the United States' 2021 withdrawal from Afghanistan, a group of female soldiers posing as medical relief are sent back in to rescue a group of kidnapped teenagers caught between ISIS and the Taliban.",
			popularity: 1758.726,
			poster_path: '/3O3qSGmjRGc10hMwFul8WDxKE5t.jpg',
			release_date: '2024-12-11',
			title: 'Dirty Angels',
			video: false,
			vote_average: 5.8,
			vote_count: 26,
		},
		{
			adult: false,
			backdrop_path: '/v9Du2HC3hlknAvGlWhquRbeifwW.jpg',
			genre_ids: [28, 12, 53],
			id: 539972,
			original_language: 'en',
			original_title: 'Kraven the Hunter',
			overview:
				"Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.",
			popularity: 1133.345,
			poster_path: '/1GvBhRxY6MELDfxFrete6BNhBB5.jpg',
			release_date: '2024-12-11',
			title: 'Kraven the Hunter',
			video: false,
			vote_average: 5.8,
			vote_count: 190,
		},
		{
			adult: false,
			backdrop_path: '/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg',
			genre_ids: [28, 12, 18],
			id: 558449,
			original_language: 'en',
			original_title: 'Gladiator II',
			overview:
				'Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.',
			popularity: 1091.838,
			poster_path: '/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
			release_date: '2024-11-05',
			title: 'Gladiator II',
			video: false,
			vote_average: 6.7,
			vote_count: 1174,
		},
		{
			adult: false,
			backdrop_path: '/9mJ9dxCGpudxyBtlC0M9Y4pTyXN.jpg',
			genre_ids: [16, 28, 878, 10751],
			id: 1184918,
			original_language: 'en',
			original_title: 'The Wild Robot',
			overview:
				"After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
			popularity: 978.986,
			poster_path: '/9w0Vh9eizfBXrcomiaFWTIPdboo.jpg',
			release_date: '2024-09-08',
			title: 'The Wild Robot',
			video: false,
			vote_average: 8.4,
			vote_count: 3573,
		},
		{
			adult: false,
			backdrop_path: '/ag66gJCiZ06q1GSJuQlhGLi3Udx.jpg',
			genre_ids: [27, 53],
			id: 1138194,
			original_language: 'en',
			original_title: 'Heretic',
			overview:
				'Two young missionaries are forced to prove their faith when they knock on the wrong door and are greeted by a diabolical Mr. Reed, becoming ensnared in his deadly game of cat-and-mouse.',
			popularity: 817.605,
			poster_path: '/5HJqjCTcaE1TFwnNh3Dn21be2es.jpg',
			release_date: '2024-10-31',
			title: 'Heretic',
			video: false,
			vote_average: 7.173,
			vote_count: 509,
		},
		{
			adult: false,
			backdrop_path: '/evFChfYeD2LqobEJf8iQsrYcGTw.jpg',
			genre_ids: [28, 80, 53],
			id: 1182387,
			original_language: 'en',
			original_title: 'Armor',
			overview:
				'Armored truck security guard James Brody is working with his son Casey transporting millions of dollars between banks when a team of thieves led by Rook orchestrate a takeover of their truck to seize the riches. Following a violent car chase, Rook soon has the armored truck surrounded and James and Casey find themselves cornered onto a decrepit bridge.',
			popularity: 750.154,
			poster_path: '/685wCHwr2kyQZxvThNIM04HuuCt.jpg',
			release_date: '2024-10-30',
			title: 'Armor',
			video: false,
			vote_average: 5.494,
			vote_count: 80,
		},
		{
			adult: false,
			backdrop_path: '/rWs3Q9bT7zCH6t004z67UGuWUwu.jpg',
			genre_ids: [16, 35, 10751, 14, 12],
			id: 645757,
			original_language: 'en',
			original_title: 'That Christmas',
			overview:
				"It's an unforgettable Christmas for the townsfolk of Wellington-on-Sea when the worst snowstorm in history alters everyone's plans — including Santa's.",
			popularity: 716.747,
			poster_path: '/bX6dx2U4hOk1esI7mYwtD3cEKdC.jpg',
			release_date: '2024-11-27',
			title: 'That Christmas',
			video: false,
			vote_average: 7.3,
			vote_count: 207,
		},
		{
			adult: false,
			backdrop_path: '/lntyt4OVDbcxA1l7LtwITbrD3FI.jpg',
			genre_ids: [10749, 18],
			id: 1010581,
			original_language: 'es',
			original_title: 'Culpa mía',
			overview:
				"Noah must leave her city, boyfriend, and friends to move into William Leister's mansion, the flashy and wealthy husband of her mother Rafaela. As a proud and independent 17 year old, Noah resists living in a mansion surrounded by luxury. However, it is there where she meets Nick, her new stepbrother, and the clash of their strong personalities becomes evident from the very beginning.",
			popularity: 828.998,
			poster_path: '/w46Vw536HwNnEzOa7J24YH9DPRS.jpg',
			release_date: '2023-06-08',
			title: 'My Fault',
			video: false,
			vote_average: 7.909,
			vote_count: 3145,
		},
		{
			adult: false,
			backdrop_path: '/t98L9uphqBSNn2Mkvdm3xSFCQyi.jpg',
			genre_ids: [27, 878],
			id: 933260,
			original_language: 'en',
			original_title: 'The Substance',
			overview:
				'A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.',
			popularity: 723.909,
			poster_path: '/lqoMzCcZYEFK729d6qzt349fB4o.jpg',
			release_date: '2024-09-07',
			title: 'The Substance',
			video: false,
			vote_average: 7.217,
			vote_count: 2721,
		},
		{
			adult: false,
			backdrop_path: '/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg',
			genre_ids: [28, 35, 878],
			id: 533535,
			original_language: 'en',
			original_title: 'Deadpool & Wolverine',
			overview:
				'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
			popularity: 755.195,
			poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
			release_date: '2024-07-24',
			title: 'Deadpool & Wolverine',
			video: false,
			vote_average: 7.7,
			vote_count: 6011,
		},
		{
			adult: false,
			backdrop_path: '/mvDMt3JZ5zlsrXduGzj9jBEfVBT.jpg',
			genre_ids: [27, 53],
			id: 1034541,
			original_language: 'en',
			original_title: 'Terrifier 3',
			overview:
				"Five years after surviving Art the Clown's Halloween massacre, Sienna and Jonathan are still struggling to rebuild their shattered lives. As the holiday season approaches, they try to embrace the Christmas spirit and leave the horrors of the past behind. But just when they think they're safe, Art returns, determined to turn their holiday cheer into a new nightmare. The festive season quickly unravels as Art unleashes his twisted brand of terror, proving that no holiday is safe.",
			popularity: 771.444,
			poster_path: '/ju10W5gl3PPK3b7TjEmVOZap51I.jpg',
			release_date: '2024-10-09',
			title: 'Terrifier 3',
			video: false,
			vote_average: 6.87,
			vote_count: 1271,
		},
	],
	total_pages: 47820,
	total_results: 956393,
});
let mov1: Movie | null = $state(null);
let mov2: Movie | null = $state(null);
let guessing = $state(true);
let filterOpen: boolean = $state(true);
let filters: Filterables = $state(DEFAULT_FILTERS);

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
};

const showResults = (movie: Movie) => {
	// cant guess if no movie is loaded
	if (!mov1 || !mov2) return;
	const isAnswerRight =
		movie.vote_average >= mov1?.vote_average &&
		movie.vote_average >= mov2.vote_average;
	guessing = false;

	// results reveal
	alert(isAnswerRight ? 'yay' : 'u suk');
};

const openFilters = () => {
	filterOpen = true;
};

const closeFilters = () => {
	filterOpen = false;
};

const refreshFilters = (updatedFilters: Filterables) => {
	filters = updatedFilters;
	console.log('NEW FILTERS: ', updatedFilters);
	// todo: update the recap component
};

onMount(async () => {
	// const auth = await tmdb.auth();
	// response = await tmdb.discover();
	// console.log($state.snapshot(await response));
	matchmake(response.results);
	// todo: design + onClick to reveal results
});
</script>

<main class="flex-grow">
	<button onclick={openFilters} class="filters-button absolute right-4 top-4 rounded-xl p-4 uppercase">
		gérer les filtres
	</button>
	{#if filterOpen}
    <FiltersDialog filters={filters} onClose={closeFilters} onUpdate={refreshFilters}/>
  {/if}
  {#if JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS) }
    <FiltersRecap filters={filters}/>
  {/if}
	{#if response.results.length > 0 && mov1 && mov2}
		<div class="splitview flex items-center w-auto min-h-full">
			<div class="left flex-1">
				<MoviePanel movie={mov1} secret={guessing} onGuess={showResults}/>
			</div>
			<div class="separator h-[33rem] rounded-3xl flex items-center justify-center w-1 z-10">
				<p class="separator-text text-xl bg-inherit min-w-10 min-h-10 rounded-full transition hover:rotate-[360deg] text-center leading-10 cursor-default">OR</p>
			</div>
			<div class="right flex-1">
				<MoviePanel movie={mov2} secret={guessing} onGuess={showResults}/>
			</div>
		</div>
	{:else}
		<div>ALERTE CABINET</div>
	{/if}
</main>

<style>
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