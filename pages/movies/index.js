import React, { useState ,useEffect} from 'react';
import TemplateSlide from '../../components/hero-slide/TemplateSlide';
import MovieGrid from '../../components/movie-grid/MovieGrid';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import cookie from 'js-cookie';
import EndMessage from '../../components/common/EndMessage';
import EndLoader from '../../components/common/EndLoader';
import Head from 'next/head';


const index = ({ movieData, user }) => {
    const [movies, setMovies] = useState(movieData);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState([]);

    const fetchDataOnScroll = async () => {
        try {
            const res = await axios.get(`${baseUrl}/movie`, {
                headers: { Authorization: cookie.get('token') },
            });
            // if (res.data.length === 0) setHasMore(false);
            // setMovies(prev => [...prev, ...res.data]);
            // setPageNumber(prev => prev + 1);
        } catch (error) {
            console.log('Error fetching movies');
        }
    }
    useEffect(() => {
        fetchDataOnScroll()
      }, [])
    return (
        <>
            <Head>
                <title>Playeon - Watch Movies</title>
                <meta name="description" content="Watch thousands of movie anywhere any time on first streaming service in Paksitan.Register your self first and enjoy every content available at playeon." />
            </Head>
            <TemplateSlide />
            <div className='container'>
                <div className='section mb-3'>
                    {/* <InfiniteScroll
                        style={{ overflow: 'hidden' }}
                        hasMore={hasMore}
                        next={fetchDataOnScroll}
                        loader={<EndLoader />}
                        endMessage={<EndMessage message={'More Movies Comming Soon!'} />}
                        dataLength={movies.length}
                    > */}
                        <MovieGrid movie={movies} user={user} />
                    {/* </InfiniteScroll> */}
                </div>
            </div>

        </>
    );
};

export const getServerSideProps = async ctx => {

    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/movie`, { headers: { Authorization: token }, params: { pageNumber: 1 } });
        return { props: { movieData: res.data } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};


export default index;









