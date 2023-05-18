import axios from 'axios';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import React, { useState } from 'react';
import TemplateSeriesSlide from '../../components/hero-slide/TemplateSeriesSlide';
import TemplateSlide from '../../components/hero-slide/TemplateSlide';
import MovieGrid from '../../components/movie-grid/MovieGrid';
import SeriesGrid from '../../components/movie-grid/SeriesGrid';
import baseUrl from '../../utils/baseUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import cookie from 'js-cookie';
import EndMessage from '../../components/common/EndMessage';
import EndLoader from '../../components/common/EndLoader';

const index = ({ seriesData, user }) => {
    const [series, setSeries] = useState(seriesData);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(2);
    const fetchDataOnScroll = async () => {
        try {
            const res = await axios.get(`${baseUrl}/series`, {
                headers: { Authorization: cookie.get('token') },
                params: { pageNumber }
            });
            if (res.data.length === 0) setHasMore(false);
            // setSeries(prev => [...prev, ...res.data]);
            setPageNumber(prev => prev + 1);
        } catch (error) {
            console.log('Error fetching series');
        }
    }
    
    return (
        <>
            <Head>
                <title>Playeon - Watch Series</title>
                <meta name="description" content="Watch thousands of series anywhere any time on first streaming service in Paksitan.Register your self first and enjoy every content available at playeon." />
            </Head>
            <TemplateSeriesSlide />
            <div className='container'>
                <div className='section mb-3'>
                    <InfiniteScroll
                        style={{ overflow: 'hidden' }}
                        hasMore={hasMore}
                        next={fetchDataOnScroll}
                        // loader={<EndLoader />}
                        endMessage={<EndMessage message={'More Series Comming Soon!'} />}
                        dataLength={series.length}
                    >
                        <SeriesGrid series={series} user={user} />
                    </InfiniteScroll>
                </div>
            </div>

        </>
    );
};


export const getServerSideProps = async ctx => {

    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/series`, { headers: { Authorization: token }, params: { pageNumber: 1 } });
        return { props: { seriesData: res.data } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};
export default index;
