export const DEFAULT_FILTERS: Filterables = {
	with_genres: [{ id: -1, name: 'Tous' }],
	with_people: [],
	primary_release_date_gte: { gte: '', lte: '' },
	vote_average_gte: { gte: 0, lte: 10 },
	vote_count_gte: { gte: 500, lte: 5000 },
};
