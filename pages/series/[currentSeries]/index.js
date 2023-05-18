import axios from 'axios';
import { parseCookies } from 'nookies';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCab, faPlay, faThumbsUp, faThumbsDown, faClockFour, faEye, faList } from '@fortawesome/free-solid-svg-icons';
import baseUrl from '../../../utils/baseUrl';
import Link from 'next/link';
import TrailerModal from '../../../components/modal/TrailerModal';

const CurrentSeriess = ({ series }) => {

    const [showTrailerModal, setShowTrailerModal] = useState(false);

    return (
        <>
            <div className='hero-slide'>
                <div
                    className='hero-slide__series active'
                    style={{ backgroundImage: `url(${series.imgLgPoster})` }}
                >
                    <div className='hero-slide__series__content container '>
                        <div className='hero-slide__series__content__info '>

                            <h2 className='title '>{series.title}</h2>
                            <div className='details'>
                                <p>{series.year}</p>
                                <p>{series.duration}</p>
                                <p>{series.genre}</p>
                            </div>

                            <div className='overview '>{series.description}</div>
                            <div className='btns '>
                                <button onClick={() => setShowTrailerModal(true)}>
                                    <FontAwesomeIcon icon={faPlay} style={{ color: '#14ED82' }} /> Watch Trailer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='episodesContainer'>
            <div className="episodeContainer__Heading">
                <h3>
                <FontAwesomeIcon icon={faList} /> Playlist</h3>
                <h3>{series.episodes.length} {series.episodes.length > 1 ? 'Episodes' : 'Episode'}</h3>
            </div>
                {series.episodes.map((curr, i) => (
                    <Link href={`/series/${series._id}/${curr._id}`}>
                        <button key={i}>
                            <FontAwesomeIcon icon={faPlay} style={{ color: '#14ED82', marginRight: '10px' }} />
                            {curr.episodeName}
                        </button>
                    </Link>
                ))}
            </div>
            {showTrailerModal && <TrailerModal trailer={series.trailer} setShowTrailerModal={setShowTrailerModal} />}
        </>
    );
}

export const getServerSideProps = async ctx => {

    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/series/${ctx.query.currentSeries}`, { headers: { Authorization: token } });
        const { series } = res.data;
        return { props: { series } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};

export default CurrentSeriess