import { token } from './secret';

const PIPE = '%7';
const SPACE = '%20';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
    },
};

const apiBaseURL = 'https://api.themoviedb.org/3';
const imgBaseURL = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

const emptyDiscover: Discover = {
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
};

export default {
    imgBaseURL,
    
    // authentication
    auth: async (): Promise<boolean | object> => {
        try {
            const res = await fetch(`${apiBaseURL}/authentication`, options);
            return res.json();
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    
    // discover movies, can be filtered
    discover: async (filters?: Filterables): Promise<Discover> => {
        // build filters query string
        const baseFilters: string = 'include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        let computedFilters: string = '';
        if (filters) {      
            if (filters.primary_release_date_gte.gte) // "2000-01-01"
                computedFilters += `&primary_release_date.gte=${filters.primary_release_date_gte.gte}`;
            if (filters.primary_release_date_gte.lte) // "2026-01-01"
                computedFilters += `&primary_release_date.lte=${filters.primary_release_date_gte.lte}`;
            if (filters.vote_average_gte.gte) // 2
                computedFilters += `&vote_average.gte=${filters.vote_average_gte.gte}`;
            if (filters.vote_average_gte.lte) // 7.5
                computedFilters += `&vote_average.lte=${filters.vote_average_gte.lte}`;
            if (filters.vote_count_gte.gte) // 200
                computedFilters += `&vote_count.gte=${filters.vote_count_gte.gte}`;
            if (filters.vote_count_gte.lte) // 5000
                computedFilters += `&vote_count.lte=${filters.vote_count_gte.lte}`;
            if (filters.with_genres && filters.with_genres[0].id !== -1) // [{ id: 27, name: "Horreur" }]
                computedFilters += `&with_genres=${filters.with_genres.map(item => item.id).join(PIPE)}`;
            // if (filters.with_people) // [Pedro Pascal, Pedro Pascal] => not a string actually, we have to use actors IDs
            //     computedFilters += `&with_people=${filters.with_genres.join(PIPE).replaceAll(' ', SPACE)}`;
            
            console.log(filters);
            console.log(computedFilters);
        }
        
        // send request
        try {
            const res = await fetch(
                `${apiBaseURL}/discover/movie?${baseFilters}${computedFilters}`,
                options,
            );
            return res.json();
        } catch (err) {
            console.error(err);
            return emptyDiscover;
        }
    },
};
