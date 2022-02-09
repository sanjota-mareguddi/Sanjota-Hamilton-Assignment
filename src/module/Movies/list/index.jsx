
import React from 'react';
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
					<img src={movie.Poster} alt='movie'></img>
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						{movie.Title}
						<a className="link" href={movie.Poster} target="_blank">Detail</a>
					</div>

				</div>

			))}
		</>
	);
};

export default MovieList;
