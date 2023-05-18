import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCab, faPlay, faThumbsUp, faThumbsDown, faClockFour } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { useRouter } from 'next/router';
const ExploreCard = ({ index, link, type, img }) => {
    const router = useRouter();
    return (
        <>
            <div className='movie-card' style={{ backgroundImage: `url(${img})` }} key={index}>
                <Link href={type === 'movie' ? `/movies/${link}` : `/series/${link}`}>
                    <button className='btn' type='submit'>
                        <FontAwesomeIcon
                            className='buttonIconMain'
                            icon={faPlay} />
                    </button>

                </Link>
                {/* <div className='buttons'>
                    <div className="mobileBtnDiv">
                        <button className='mobileBtn' onClick={type === 'movie' ? () => router.push(`/movies/${link}`) : () => router.push(`/series/${link}`)}>
                            <FontAwesomeIcon icon={faPlay} /> PLAY
                        </button>
                    </div>
                </div> */}
            </div>

        </>

    );
}

export default ExploreCard