
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './module/footer/pagination/index';
import MovieList from './module/Movies/list/index';
import SearchBox from './module/Movies/search/index';
import SortBy from './module/Movies/sort/index';

import './App.css';
function App() {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(10);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(4);
  const [pageNav, setPageNav] = useState(true);
  const [sortMode, setsortMode] = useState('asc');
  const [searchValue, setSearchValue] = useState('movie');
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //pagination
  const prepage = () => {
    if (currentPage === 1);
    else
      setCurrentPage(currentPage - 1);
      //call the api to fetch the data and update the movies list
  }

  const nextpage = () => {
    if (currentPage === Math.ceil(totalResults / moviesPerPage));
    else
    setCurrentPage(currentPage + 1);
    //call the api to fetch the data and update the movies list
  }

  //API call to get the Movies data
  const getMovieRequest = async (searchValue, currentPage = 1) => {
    setLoading(true);
    //search input clear handle
    const searcKey = searchValue === '' ? "movie" :searchValue;
    setSearchValue(searcKey);
    //used public API omdbapi to get the movies list
    const url = `http://www.omdbapi.com/?s=${searcKey}&page=${currentPage}&apikey=263d22d8`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
      setPageNav(true);
      setLoading(false);
      setTotalResults(responseJson.Search.length)
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue,currentPage);
  }, [searchValue,currentPage]);

  //sort by asc/desc
  const change = (e) => {
    setsortMode(e.target.value);
    setMovies(movies.slice().sort(function (firstUser, secondUser) {
      if (firstUser.Title > secondUser.Title) return 1;
      if (firstUser.Title < secondUser.Title) return -1;
      return 0;
    }));
    setPageNav(true);
  }

  return (
    <div className="App">
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <div className='row results'><label> {movies.length >= 1 ? movies.length : "No records"} Records Found</label></div>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
          <SortBy change={change} />
        </div>
        <div className='row'>
          <MovieList
            movies={currentMovies}
            loading={loading}
          />
        </div>
        {pageNav ? <Pagination
          moviesPerPage={moviesPerPage}
          totalMovies={totalResults}
          paginate={paginate}
          prepage={prepage}
          nextpage={nextpage}
        /> : null}
      </div>

    </div>

  );
}

export default App;
