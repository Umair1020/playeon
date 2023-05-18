import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Button from '../button/Button';
import { SwiperSlide, Swiper } from 'swiper/react';
import Link from 'next/link';
import MovieCard from '../movie-card/MovieCard';
import MovieCard1 from '../../pages/movieId/index';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const MovieList = ({ genre,user}) => {
//   console.log(user
const [views , setViews] = useState([]);
const [getUserView,setgetUserView] = useState([])
const getId = async ()=>{
    const view = await axios.get(`${baseUrl}/signup/getUser/list`)
    // console.log(view)
    // console.log(myArr)
    setViews([...view.data])
}
const datalength = views.length;
// console.log(datalength)
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const getMoviesByGenre = async (action) => {
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/movie/list/${action}`);
            setItems([...res.data]);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    useEffect(() => {
        getMoviesByGenre(genre);
        getId()
    }, [])


    if (items < 1) {
        return null
    }


    return (
        <>
            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>{CapitilizeFirstLetter(genre)}</h2>
                </div>
                {loading ? <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <p>
                        <Skeleton className='skeletonStyle' />
                    </p>
                </SkeletonTheme>
                    :
                    <div className='movie-list'>
                        <Swiper
                            grabCursor={true}
                            spaceBetween={10}
                            slidesPerView={'auto'}
                            navigation
                        >
                            {
                                items.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <MovieCard item={item} loading={loading} user={user} datalength={datalength
                                        } />
                                        {/* <MovieCard user={user} /> */}
                                        {/* <MovieCard1 item={item} loading={loading} /> */}
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>}
                    {/* <button onClick={getId}>get</button> */}
                    {/* {
                        views.map((check,i)=>{
                            console.log(check.name)
                        })
                    } */}
            </div>
        </>
    );
};



export default MovieList;







