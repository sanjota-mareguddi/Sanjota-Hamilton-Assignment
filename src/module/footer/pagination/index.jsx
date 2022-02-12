import React from 'react';
import "./style.scss"

const Pagination = ({moviesPerPage, totalMovies, paginate, prepage, nextpage,currentPage,upperPageBound,lowerPageBound}) => {
    const pageNumbers =[];

    for(let i=1; i<= Math.ceil(totalMovies / upperPageBound); i++){
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        if(number === 1 && currentPage === 1){
            return(
                <li key={number} className='active' id={number}><button id={number} 
                onClick={() => paginate(number)}>{number}</button></li>
            )
        }
        else if((number < upperPageBound + 1) && number > lowerPageBound){
            return(
                <li key={number} id={number}>
             <button  className="page-link"  id={number} onClick={() => paginate(number)}>{number}</button></li>
            )
        }
    });


    return (
        <nav>
            <ul className="pagination justify-content-center">

                <li className="page-item">
                <button className="page-link" onClick={() => prepage()} >Previous</button>
                </li>
                {
                    renderPageNumbers
                }
                <li class="page-item">
                <button class="page-link" onClick={() => nextpage()}>Next</button>
                </li>

            </ul>
        </nav>
    )
}
export default Pagination;
