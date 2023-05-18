import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import baseUrl from '../../../utils/baseUrl';
import cookie from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const StickyLink = ({ showAdvertisment, setShowAd }) => {
    const [activeAd, setActiveAd] = useState([]);
    useEffect(() => {
        const getActiveAd = async () => {
            const res = await axios.get(`${baseUrl}/ad`, { headers: { Authorization: cookie.get('token') } });
            setActiveAd({ ...res.data });
        }
        getActiveAd();
    }, [])



    if (activeAd.ad && showAdvertisment) {
        setTimeout(() => {
            setShowAd(false);
        }, activeAd.ad.validity);
    }

    return (
        <>
            {activeAd.ad ?
                <div className='socail' >
                    <div className='main'>
                        <button className='addCloseButton' onClick={() => setShowAd(false)}>x</button>
                        <img src={activeAd.ad.adPoster} />
                        <div className="addBottomContainer">
                            <a href={activeAd.ad.link} target="_blank" rel="noopener noreferrer">
                                <button>
                                    <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '5px' }} />
                                    Visite
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    );
};

export default StickyLink;
