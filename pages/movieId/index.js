import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../../components/button/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCab, faEye, faPlay, faPlayCircle, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { NumberFormatter } from '../../utils/utilityFunctions';


const MovieCard1 = ({ item,user }) => {
   console.log(item._id)
    return (
        <>

            <div className='movie-card' style={{ backgroundImage: `url(${item.imgSmPoster})` }}>
                <Link href={item.type === 'movie' ? `/movies/${item._id}` : `/series/${item._id}`}>
                    <button className='btn'>
                        <FontAwesomeIcon icon={faPlay} className='buttonIconMain' />
                    </button>
                </Link>
                <div className='buttons'>
                    <div className="likesSeperator">
                        <span>
                            <FontAwesomeIcon
                                icon={faEye}
                                style={{ fontSize: '18px' }} /> {NumberFormatter(item.views)} 
                        </span>
                    </div>
                </div>
            </div>




        </>

    );
};

export default MovieCard1;






// <i class="fas fa-play"></i>
// <i class="fab fa-google-play"></i>
// <i class="fab fa-youtube"></i>