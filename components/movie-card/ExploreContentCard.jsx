import { faEye, faPlay, faThumbsUp, faArrowDown, faArrowUp, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import baseUrl from '../../utils/baseUrl';
import { likeMovieShort } from '../../utils/exploreMovies';
import { likeSeriesShort } from '../../utils/exploreSeries';
import { likeMovie } from '../../utils/movieActions';
import { likeSeries } from '../../utils/seriesActions';
import { NumberFormatter } from '../../utils/utilityFunctions';

// movies, user
const ExploreContentCard = ({ img, link, shortLikes, user, itemId, index, movieViews, moiveTilte, moiveDescription, shortVideo, genre, type, episodes, isMovie, isSeries }) => {



    const [showDetails, setShowDetails] = useState(false);
    const [likes, setLikes] = useState(shortLikes);
    const isLiked = likes.length > 0 && likes.filter(likes => likes.user === user._id).length > 0;
    const getViewsOnClick = async (id) => {
        await axios.post(`${baseUrl}/movie/countviews`, { id, view: 1 })
    }
    const getSeriesViewsOnClick = async (id) => {
        await axios.post(`${baseUrl}/series/countviews`, { id, view: 1 })
    }
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    }
    return (
        <>
            <div key={index} className='explore__content'>
                <div className='explore__heading'>
                    <div className='explore__left'>
                        <img src={isMovie ? isMovie.imgSmPoster : isSeries.imgSmPoster} alt={isMovie ? isMovie.title : isSeries.title} />
                        <h3 className='title'>{isMovie ? isMovie.title : isSeries.title}</h3>
                    </div>
                    <p>{isMovie ? NumberFormatter(isMovie.views) : NumberFormatter(isSeries.views)} <FontAwesomeIcon icon={faEye} /></p>
                </div>
                <video
                    style={{
                        background: `url(${img}) no-repeat 0 0`,
                        backgroundSize: 'cover'
                    }}
                    controlsList='nodownload noplaybackrate'
                    id={"videoRef" + index}
                    controls
                    autoPlay
                >
                    <source src={shortVideo} type='video/mp4' />
                </video>
                <div className='explore__detail'>
                    {isMovie &&
                        (<>
                            <span>
                                <FontAwesomeIcon
                                    onClick={() => likeMovieShort(itemId, user._id, setLikes, isLiked ? false : true)}
                                    icon={faThumbsUp}
                                    style={isLiked ? { fontSize: '15px', color: '#14ED82' } : { fontSize: '15px' }} />  {likes.length}
                            </span>

                            <div className='seperateBox'>
                                <Link href={`/movies/${isMovie._id}`}>
                                    <button className='playNowButton' onClick={() => getViewsOnClick(isMovie._id)}> <FontAwesomeIcon icon={faPlay} /> Watch Now</button>
                                </Link>
                                <button className='showDetailContent' onClick={() => setShowDetails(!showDetails)}>
                                    {showDetails ?
                                        <FontAwesomeIcon
                                            icon={faAngleUp}
                                            style={{ fontSize: '20px' }}
                                        />
                                        :
                                        <FontAwesomeIcon
                                            icon={faAngleDown}
                                            style={{ fontSize: '20px' }}
                                        />}
                                </button>
                            </div>
                        </>)
                    }
                    {isSeries &&
                        (<>
                            <span>
                                <FontAwesomeIcon
                                    onClick={() => likeSeriesShort(itemId, user._id, setLikes, isLiked ? false : true)}
                                    icon={faThumbsUp}
                                    style={isLiked ? { fontSize: '15px', color: '#14ED82' } : { fontSize: '15px' }} />  {likes.length}
                            </span>
                            <div className='seperateBox'>
                                <Link href={`/series/${isSeries._id}`}>
                                    <button className='playNowButton' onClick={() => getSeriesViewsOnClick(isSeries._id)}> <FontAwesomeIcon icon={faPlay} /> Watch Now</button>
                                </Link>
                                <button className='showDetailContent' onClick={() => setShowDetails(!showDetails)}>
                                    {showDetails ?
                                        <FontAwesomeIcon
                                            icon={faArrowUp}
                                            style={{ fontSize: '20px' }}
                                        />
                                        :
                                        <FontAwesomeIcon
                                            icon={faArrowDown}
                                            style={{ fontSize: '20px' }}
                                        />}
                                </button>
                            </div>
                        </>)
                    }
                </div>

                {showDetails && (
                    <>
                        <p className='movieGenre'>Genre: {isMovie ? isMovie.genre : isSeries.genre}</p>
                        {isSeries &&
                            <p className='movieGenre'>EPISODES: {isSeries.episodes.length}</p>}
                        <p className='movieDescription'>
                            {isMovie ? isMovie.description : isSeries.description}

                        </p>
                    </>
                )}
            </div>
        </>
    )
}

export default ExploreContentCard