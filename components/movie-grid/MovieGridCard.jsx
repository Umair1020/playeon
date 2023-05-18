import React, { useState } from 'react';
import Button from '../button/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCab, faClockFour, faEye, faPlay, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { likeMovie } from '../../utils/movieActions';
import Link from 'next/link';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { NumberFormatter } from '../../utils/utilityFunctions';


const MovieGridCard = ({ img, link, movieLikes, user, movieId, index, movieViews }) => {
    const router = useRouter();
    const [likes, setLikes] = useState(movieLikes);

    const isLiked = likes.length > 0 && likes.filter(likes => likes.user === user._id).length > 0;
    const getViewsOnClick = async (id) => {
        await axios.post(`${baseUrl}/movie/countviews`, { id, view: 1 })
    }

    const myData = {
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country,
        imgPic: user.profilePicture,
        userId: user._id
    }
  
    const setUser = async () => {
        {
            try {

                const send = await axios.post(`${baseUrl}/signup/livestream`, myData)
                if(myData.userId===myData.userId)
                {
                    return
                }

                console.log(send)
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <>
            <div className='movie-card' style={{ backgroundImage: `url(${img})` }} key={index}>
                <Link href={`/movies/${link}`}>
                    <button className='btn' type='submit' onClick={() => getViewsOnClick(link)}>
                        <FontAwesomeIcon
                            className='buttonIconMain'
                            icon={faPlay}
                            onClick={setUser}
                             />
                    </button>
                </Link>
                <div className='buttons'>
                    {/* <div className="mobileBtnDiv">
                        <button className='mobileBtn' onClick={() => {
                            getViewsOnClick(link)
                            router.push(`/movies/${link}`)
                        }}>
                            <FontAwesomeIcon icon={faPlay} /> PLAY
                        </button>
                    </div> */}
                    <div className="likesSeperator">
                        <span>
                            <FontAwesomeIcon
                                onClick={() => likeMovie(movieId, user._id, setLikes, isLiked ? false : true)}
                                icon={faThumbsUp}
                                style={isLiked ?
                                    { fontSize: '20px', color: '#14ED82' } :
                                    { fontSize: '20px' }} /> {likes.length}
                        </span>
                        <span>
                            <FontAwesomeIcon
                                icon={faEye}
                                style={{ fontSize: '18px' }} />  {NumberFormatter(movieViews)}
                        </span>
                    </div>

                </div>
            </div>

        </>

    );
};

export default MovieGridCard;