<script lang="ts">
interface Filter {
	name: string;
	type: string;
	values?: object[];
	range?: boolean;
	multiple?: boolean;
}

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

const filterable: Filter[] = [
	{ name: 'include_adult', type: 'boolean' },
	{ name: 'with_genres', type: 'select', values: genres, multiple: true },
	{ name: 'with_people', type: 'string' },
	{ name: 'year', type: 'date', range: true },
	{ name: 'title', type: 'string' },
	{ name: 'vote_average', type: 'number' },
	{ name: 'vote_count', type: 'number' },
];
</script>

