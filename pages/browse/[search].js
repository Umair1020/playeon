import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import Loading from '../../components/loading-spinner/Loading';
import MovieGrid from '../../components/movie-grid/MovieGrid';
import SeriesGrid from '../../components/movie-grid/SeriesGrid';
import cookie from 'js-cookie';
import ExploreGrid from '../../components/movie-grid/ExploreGrid';
const Search = ({ user }) => {
    const router = useRouter();
    const { search } = router.query;
    const [loading, setLoading] = useState(false);
    // const [movieResults, setMovieResults] = useState([]);
    // const [seriesResult, setSeriesResults] = useState([]);
    const [allContent, setAllContent] = useState([]);
    const searchText = search;
    const getSerachResults = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/search/${searchText}`, { headers: { Authorization: cookie.get('token') } });
            setAllContent([...res.data]);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    useEffect(() => {
        getSerachResults();
    }, [search])
    console.log(allContent);
    return (
        <>
            {loading && (
                <div style={{
                    margin: '50rem'
                }}>
                    <Loading />
                </div>
            )}
            <div className='container mtmb-10'>
                <div className='section mb-3'>
                    <h2>Search results for {searchText} ...</h2>
                    <div style={{ margin: '10px auto' }}>
                        {allContent < 1 ? <h3 style={{ color: 'crimson', padding: '10px' }}>No results found with {search}</h3> : <ExploreGrid data={allContent} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search