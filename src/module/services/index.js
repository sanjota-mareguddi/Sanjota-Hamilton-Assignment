export function Service() {
    //configurable section
    const ROOT = {
        URL: "https://api.themoviedb.org/3/",
        IMAGE_BASE_URL: 'http://image.tmdb.org/t/p/',
        API_KEY: '844dba0bfd8f3a4f3799f6130ef9e335',
        METHOD: {
            GET: "GET",
            POST: "POST"
        },
        SERVICE: {
            configuration: "configuration"
        }
    }
//TO-DO
    async function getMoviesList() {
        // const param={
        //     api_key:ROOT.API_KEY
        // }
        // const data=fetch(ROOT.ULR,SERVICE.configuration?param).then(resp=>resp.json().then(data=>data));
        const resp = await fetch("https://api.themoviedb.org/3/configuration?api_key=019e8f375549e0bbd4a4191862ebc88f");
        const result = await resp.json();
        return result;
    }

    return {
        moviesList: getMoviesList
    }
}