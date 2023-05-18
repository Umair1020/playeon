import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCab, faClockFour, faPlay, faSearch, faThumbsDown, faThumbsUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import Link from 'next/link'
import { useRouter } from 'next/router';
let cancel;
const MobileSearch = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [allContent, setAllContent] = useState([]);
    const router = useRouter();
    const handleChange = async (e) => {
        const { value } = e.target;
        if (value.trim().length === 0) return setSearchText(value);
        setSearchText(value);
        setShowSearchModal(true);
        setLoading(true);
        try {
            cancel && cancel();
            const CancelToken = axios.CancelToken;
            const token = cookie.get('token');
            const res = await axios.get(`${baseUrl}/search/${searchText}`, {
                headers: { Authorization: token },
                cancelToken: new CancelToken(canceler => {
                    cancel = canceler;
                })
            });
            setAllContent([...res.data]);
        } catch (error) {
            console.log('Error Searching');
        }
        setLoading(false);
    }
    useEffect(() => {
        if (searchText.length === 0) {
            setAllContent([]);
        }
    }, [searchText])
    const submitHandleSearch = () => {
        if (searchText !== '') {
            router.push(`/browse/${searchText}`);
            setSearchText('');
        }
    }
    return (
        <>
            <div className="search-box-mobile">
                <button className="btn-search" onClick={submitHandleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                    onBlur={() => {
                        setTimeout(() => {
                            setShowSearchModal(false);
                        }, 100)
                    }}
                    autoComplete='off'
                    onChange={handleChange}
                    name='serachText'
                    type="text"
                    className="input-search"
                    placeholder="Search with title..." />
                {showSearchModal &&
                    <div className='resultsRendrer'>
                        <div>
                            {loading && <p>Loading...</p>}
                            {allContent < 1 ?
                                <p style={{ padding: '5px' }}>No results found with {searchText}</p>
                                :
                                allContent.map((item, i) => {
                                    const { imgSmPoster, title, _id, type } = item;
                                    return (
                                        <>
                                            <Link href={type === 'movie' ? `/movies/${_id}` : `/series/${_id}`}>
                                                <div className='resultsSection' key={i} onClick={() => setSearchText('')}>
                                                    <img src={imgSmPoster} alt={title} />
                                                    <p>{title}</p>
                                                </div>
                                            </Link>
                                        </>
                                    )
                                })}
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default MobileSearch