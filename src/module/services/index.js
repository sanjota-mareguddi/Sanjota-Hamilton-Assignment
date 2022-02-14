export default function MoviesService() {
    //configurable section
    const ROOT = {
        URL: "http://www.omdbapi.com/",
        API_KEY: '263d22d8',
        APIKey: 'c951ff1',
        METHOD: {
            GET: "GET",
            POST: "POST"
        },
        SERVICE: {
            configuration: "configuration"
        }

    }
    async function getMoviesList(searcKey, currentPage) {
        const url = `${ROOT.URL}?s=${searcKey}&page=${currentPage}&apikey=${ROOT.API_KEY}`;
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }

    async function fetchMovieDetailById(id) {
        const url = `${ROOT.URL}?apikey=${ROOT.APIKey}&i=${id}`;
        const response = await fetch(url);
        const responseJson = await response.json();
        debugger;
        return responseJson;
    }
    return {
        moviesList: getMoviesList,
        movieDetail:fetchMovieDetailById
    }
}