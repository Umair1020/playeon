import Link from 'next/link';
import React, { useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import Button from '../button/Button';

const TopTen = () => {
    const movieData = [
        {
            img: '//image.tmdb.org/t/p/w220_and_h330_face/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg',
            id: 1
        },
        {
            img: '//image.tmdb.org/t/p/w220_and_h330_face/6tfT03sGp9k4c0J3dypjrI8TSAI.jpg',
            id: 2
        },
        {
            img: '//image.tmdb.org/t/p/w220_and_h330_face/clnyhPqj1SNgpAdeSS6a6fwE6Bo.jpg',
            id: 3
        },
        {
            img: '//image.tmdb.org/t/p/w220_and_h330_face/wGFUewXPeMErCe2xnCmmLEiHOGh.jpg',
            id: 4
        },
        {
            img: '//image.tmdb.org/t/p/w220_and_h330_face/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg',
            id: 5
        },
        {
            img: '//image.tmdb.org/t/p/w220_and_h330_face/g6tIKGc3f1H5QMz1dcgCwADKpZ7.jpg',
            id: 6
        },
        {
            img: '//image.tmdb.org/t/p/w220_and_h330_face/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg',
            id: 7
        },
        {
            img: '//image.tmdb.org/t/p/w220_and_h330_face/2IWouZK4gkgHhJa3oyYuSWfSqbG.jpg',
            id: 8
        },
        {
            img: '//image.tmdb.org/t/p/w220_and_h330_face/scZlQQYnDVlnpxFTxaIv2g0BWnL.jpg',
            id: 9
        },
        {
            img: '//image.tmdb.org/t/p/w220_and_h330_face/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg',
            id: 10
        },

    ]
    const [movies, setMovies] = useState(movieData);

    return (
        <div className='top__wrapper'>
            <Swiper
                grabCursor={true}
                spaceBetween={50}
                slidesPerView={'auto'}
            >
                {
                    movies.map((item, i) => (
                        <SwiperSlide key={i}>
                            <Card imgSrc={item.img} counter={item.id} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}


const Card = ({ imgSrc, counter }) => {
    return (
        <Link href='/movies'>
            <div className="item">
                <img src={imgSrc} />
                <div>
                    {counter}
                </div>
            </div>
        </Link>
    )
}

export default TopTen