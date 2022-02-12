
import React from 'react';
import { Link } from "react-router-dom";
import './style.scss';
import ListGhost from '../../../shared/components/ghost-elements/index'

const MovieList = (props) => {
	if (props.loading) {
		return (<div className='ghost-elements'><ListGhost /></div>);
	}

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					{/* <Link to={`/movie/${movie.imdbID}`}> */}
						<div>
							<div className="card-top">
								<img src={movie.Poster} alt={movie.Title} />
							</div>
							<div className="card-bottom">
								<div className="card-info">
									<p>{movie.Title}</p>
									<p>{movie.Year}</p>
								</div>
							</div>
						</div>

					{/* </Link> */}
				</div>

			))}
		</>
	);
};

export default MovieList;
