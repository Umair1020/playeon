import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import baseUrl from '../../utils/baseUrl';
import Button, { OutlineButton } from '../button/Button';
import TrailerModal from '../modal/TrailerModal';

const TemplateSeriesSlide = () => {
    const router = useRouter();
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    const [latest, setLatest] = useState([]);
    useEffect(() => {
        const getLatestSeries = async () => {
            const res = await axios.get(`${baseUrl}/series/latest`);
            setLatest(...res.data);
        }
        getLatestSeries();
    }, []);

    return (
        <>
            <div className='hero-slide'>
                <div
                    className='hero-slide__item active'
                    style={{ backgroundImage: `url(${latest.imgLgPoster})` }}
                >
                    <div className='hero-slide__item__content container '>
                        <div className='hero-slide__item__content__info '>

                            <h2 className='title '>{latest.title}</h2>
                            <div className='details'>
                                <p>{latest.year}</p>
                                <p>{latest.duration}</p>
                                <p>{latest.genre}</p>
                            </div>

                            <div className='overview '>{latest.description}</div>
                            <div className='btns '>
                                <button onClick={() => router.push(`/series/${latest._id}`)}>
                                    <FontAwesomeIcon icon={faPlay} style={{ color: '#14ED82' }} /> Watch Now
                                </button>
                                <button onClick={() => setShowTrailerModal(true)}>
                                    Watch Trailer
                                </button>
                            </div>
                        </div>
                        <div className='hero-slide__item__content__poster'>
                            <img src={latest.imgSmPoster} />
                        </div>
                    </div>
                </div>
            </div>
            {showTrailerModal && <TrailerModal trailer={latest.trailer} setShowTrailerModal={setShowTrailerModal} />}
        </>
    )
}

export default TemplateSeriesSlide