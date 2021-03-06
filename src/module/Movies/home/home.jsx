import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '../pagination/index';
import MovieList from '../list/index';
import SearchBox from '../search/index';
import SortBy from '../sort/index';
import MoviesService from '../../services/index';
import { getMoviesActions, getMoviesDetailsAction } from '../../../redux/actions/index';
import store from '../../../redux/store';

const MovieHomePage = () => {
    const moviesService = new MoviesService();
    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState(10);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(5);
    const [imdbIDData, setImdbIDData] = useState('tt9243946');
    const [pageNav, setPageNav] = useState(false);
    const [searchValue, setSearchValue] = useState('movie');
    const [sortMode, setSortMode] = useState('asc');
    const [upperPageBound, setUpperPageBound] = useState(10)
    const [lowerPageBound, setLowerPageBound] = useState(0)
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

    let moviesStore = useSelector((state) => state.moviesList);

    let currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const dispatch = useDispatch();

    function sortByTitle(moviesData, modeChange) {
        if (moviesData.length >= 1) {
            setSortMode(modeChange);
            let mode = modeChange;
            let sortedMovies = [];
            if (mode === 'asc') {
                sortedMovies = moviesData.sort((a, b) => (a.Title > b.Title) ? 1 : -1);
                setMovies(sortedMovies);
                setPageNav(true);
            } else {
                sortedMovies = moviesData.sort((a, b) => (a.Title > b.Title) ? -1 : 1);
                setMovies(sortedMovies);
                setPageNav(true);
            }
            mode = !mode
        }

    }
    //sort by asc/desc
    const change = (e) => {
        sortByTitle(movies, e.target.value)
    }
    useEffect(() => {
        getMovieRequest(searchValue, currentPage);
    }, [searchValue, currentPage]);


    useEffect(() => {
        currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    }, []);

    //pagination
    const prepage = () => {
        if (currentPage === 1);
        else
            setCurrentPage(currentPage - 1);
    }

    const nextpage = () => {

        if ((currentPage + 1) > upperPageBound) {
            setUpperPageBound(upperPageBound + moviesPerPage);
            setLowerPageBound(lowerPageBound + moviesPerPage);
        }
        let listid = currentPage + 1;
        setCurrentPage(listid);
        if (currentPage === Math.ceil(totalResults / moviesPerPage)) { return }
    }

    //API call to get the Movies data
    const getMovieRequest = async (searchValue, currentPage = 1) => {
        const searcKey = searchValue === '' ? "movie" : searchValue;
        setSearchValue(searcKey);
        const responseJson = await moviesService.moviesList(searcKey, currentPage)
        setLoading(true);
        if (responseJson.Search) {
            dispatch(getMoviesActions(responseJson));
            sortByTitle(moviesStore.movies.Search, sortMode);
            setTotalResults(moviesStore.movies.totalResults);
            setLoading(false);
            //  setMoviesPerPage(700) //display 10 records per page
        }
    };

    function getMoviesData() {
        var newState = store.getState();
        moviesStore = newState.moviesList;
        console.log('state changed');
    }
    store.subscribe(getMoviesData)
    return (
        <div className='container movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <div className='row results'><label> {totalResults >= 1 ? totalResults : "No records"} Records Found</label></div>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                <div class="sort-section"><label>SORT BY</label> <SortBy change={change} /></div>
            </div>
            <div className='row'>
                <MovieList
                    movies={movies}
                    loading={loading}
                />
            </div>
            {pageNav ? <Pagination
                moviesPerPage={moviesPerPage}
                totalMovies={totalResults}
                paginate={paginate}
                prepage={prepage}
                nextpage={nextpage}
                currentPage={currentPage}
                lowerPageBound={lowerPageBound}
                upperPageBound={upperPageBound}
            /> : null}
        </div>
    )
}

export default MovieHomePage;