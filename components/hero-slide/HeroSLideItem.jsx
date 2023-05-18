import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const HeroSlideItem = ({ user }) => {
    const router = useRouter();
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
                if (myData.userId === myData.userId) {
                    return
                }

                console.log(send)
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (


        <div className='btns' >
            <button onClick={() => router.push(`/movies/${item._id}`)}>
                <FontAwesomeIcon icon={faPlay} style={{ color: '#14ED82' }} onClick={setUser} /> Watch Now
            </button>

        </div>

    )
}


export default HeroSlideItem