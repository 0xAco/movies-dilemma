type Movie = {
	adult: boolean;
	backdrop_path: string; // /file-id.jpg
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string; // /file-id.jpg
	release_date: string; // YYYY-MM-DD
	title: string;
	video: boolean;
	vote_average: number; // rating
	vote_count: number; // number of votes
};

type Genre = {
	id: number;
	name: string;
};

type Discover = {
	page: number;
	total_pages: number;
	total_results: number;
	results: Movie[];
};

// gte stands for Greater Than or Equal
// it is the minimum value
// lte is the opposite : Lower Than or Equal
type GteLte = {
	gte: string | number; // YYYY-MM-DD, float
	lte: string | number; // YYYY-MM-DD, float
};

// some filters support AND (,) or OR (|)
// if region is set, regional release date will be used instead of primary release date
// the date returned will be the first date based on the query
type DiscoverFilters = {
	certification?: string | GteLte; // use with region
	certification_country?: string; // use with the 3 above

	include_adult?: boolean; // defaults to false
	include_video?: boolean; // defaults to false

	language?: string; // defaults to en-US
	page?: number; // defaults to 1

	primary_release_year?: number;
	primary_release_date?: GteLte; // YYYY-MM-DD
	region?: string;
	release_date?: GteLte; // YYYY-MM-DD
	sort_by?: string; // defaults to popularity.desc

	vote_average?: GteLte; // float
	vote_count?: GteLte; // float
	watch_region?: string; // use with with_watch_monetization_types or with_watch_providers

	with_cast?: string; // supports AND/OR
	with_companies?: string; // supports AND/OR
	with_crew?: string; // supports AND/OR
	with_genres?: string; // supports AND/OR
	with_keywords?: string; // supports AND/OR
	with_origin_country?: string;
	with_original_language?: string;
	with_people?: string; // supports AND/OR
	with_release_type?: number; // value in [1, 2, 3, 4, 5, 6], supports AND/OR, can be used with region
	with_runtime?: GteLte; // number
	with_watch_monetization_types?: string; // value in [flatrate, free, ads, rent, buy], supports AND/OR, can be used with watch_region
	with_watch_providers?: string; // use with watch_region, supports AND/OR

	without_companies?: string;
	without_genres?: string;
	without_keywords?: string;
	without_watch_providers?: string;

	year?: number;
};
