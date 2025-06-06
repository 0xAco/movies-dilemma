import { token } from './secret';

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
        let computedFilters: string = '';
        if (filters) {
            console.log(filters);
        }
        
        try {
            const res = await fetch(
                `${apiBaseURL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
                options,
            );
            return res.json();
        } catch (err) {
            console.error(err);
            return emptyDiscover;
        }
    },
};
