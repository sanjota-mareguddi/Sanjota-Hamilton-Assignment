
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './module/footer/pagination/index';
import MovieList from './module/Movies/list/index';
import SearchBox from './module/Movies/search/index';
import SortBy from './module/Movies/sort/index';
import MoviesService from './module/services/index'
import ListGhost from './shared/components/ghost-elements/index'
import './App.css';

const moviesService = new MoviesService();
function App() {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(10);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5);
  const [pageNav, setPageNav] = useState(false);
  const [searchValue, setSearchValue] = useState('movie');
  const [sortMode, setSortMode] = useState('asc');
  const[upperPageBound, setUpperPageBound]=useState(10)
  const[lowerPageBound, setLowerPageBound]=useState(0)
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
   let currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //pagination
  const prepage = () => {
    if (currentPage === 1);
    else
      setCurrentPage(currentPage - 1);
  }

  const nextpage = () => {

    if((currentPage + 1) > upperPageBound ){
      setUpperPageBound(upperPageBound+moviesPerPage);
      setLowerPageBound(lowerPageBound+moviesPerPage);
  }
  let listid = currentPage + 1;
  setCurrentPage(listid);
  if (currentPage === Math.ceil(totalResults / moviesPerPage)){return}
  }

  //API call to get the Movies data
  const getMovieRequest = async (searchValue, currentPage = 1) => {
    const searcKey = searchValue === '' ? "movie" : searchValue;
    setSearchValue(searcKey);
    const responseJson = await moviesService.moviesList(searcKey, currentPage)
    setLoading(true);
    if (responseJson.Search) {
       sortByTitle(responseJson.Search,sortMode);
       setPageNav(true);
       setTotalResults(responseJson.totalResults);
       setLoading(false);
      //  setMoviesPerPage(700) //display 10 records per page
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue, currentPage);
  }, [searchValue, currentPage]);


  useEffect(() => {
    currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  }, []);


  function sortByTitle(moviesData,modeChange) {
    setSortMode(modeChange);
    let mode = modeChange;
    let sortedMovies = [];
    if (mode === 'asc') {
      sortedMovies = moviesData.sort((a, b) => (a.Title > b.Title) ? 1 : -1);
      setMovies(sortedMovies);
    } else {
      sortedMovies = moviesData.sort((a, b) => (a.Title > b.Title) ? -1 : 1);
      setMovies(sortedMovies);
    }
    mode = !mode

  }

  //sort by asc/desc
  const change = (e) => {
    sortByTitle(movies,e.target.value)
  }

  return (
    <div className="App">
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <div className='row results'><label> {totalResults >= 1 ? totalResults : "No records"} Records Found</label></div>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
          <SortBy change={change} />
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
    </div>

  );
}

export default App;
