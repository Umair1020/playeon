import React, { useState } from 'react';
import Button from '../button/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockFour, faEye, faPlay, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { likeSeries } from '../../utils/seriesActions';
import Link from 'next/link';
import { NumberFormatter } from '../../utils/utilityFunctions';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

const SeriesGridCard = ({ img, link, seriesId, index, seriesLikes, user, seriesViews }) => {
    const router = useRouter();
    const [likes, setLikes] = useState(seriesLikes);
    const isLiked = likes.length > 0 && likes.filter(likes => likes.user === user._id).length > 0;
    const getViewsOnClick = async (id) => {
        await axios.post(`${baseUrl}/series/countviews`, { id, view: 1 })
    }
    return (
        <>
            <div className='movie-card' style={{ backgroundImage: `url(${img})` }} key={index}>
                <Link href={`/series/${link}`}>
                    <button className='btn' onClick={() => getViewsOnClick(link)}>
                        <FontAwesomeIcon 
                        className='buttonIconMain'
                        icon={faPlay} />
                    </button>
                </Link>
                <div className='buttons'>
                    {/* <div className="mobileBtnDiv">
                        <button className='mobileBtn' onClick={() => {
                            getViewsOnClick(link)
                            router.push(`/series/${link}`)
                        }}>
                            <FontAwesomeIcon icon={faPlay} /> PLAY
                        </button>
                    </div> */}
                    <div className="likesSeperator">
                        <span>
                            <FontAwesomeIcon
                                onClick={() => likeSeries(seriesId, user._id, setLikes, isLiked ? false : true)}
                                icon={faThumbsUp}
                                style={isLiked ?
                                    { fontSize: '20px', color: '#14ED82' } :
                                    { fontSize: '20px' }} /> {likes.length}
                        </span>
                        <span>
                            <FontAwesomeIcon
                                icon={faEye}
                                style={{ fontSize: '18px' }} /> {NumberFormatter(seriesViews)}
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SeriesGridCard

