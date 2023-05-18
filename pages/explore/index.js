import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import MovieGrid from '../../components/movie-grid/MovieGrid';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import cookie from 'js-cookie';
import EndMessage from '../../components/common/EndMessage';
import EndLoader from '../../components/common/EndLoader';
import ExploreContentCard from '../../components/movie-card/ExploreContentCard';

const index = ({ exploreData, user }) => {

  const [data, setData] = useState(exploreData);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  const videoRef = useRef(null);
  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/explore`, {
        headers: { Authorization: cookie.get('token') },
        params: { pageNumber }
      });
      if (res.data.length === 0) setHasMore(false);
      setData(prev => [...prev, ...res.data]);
      setPageNumber(prev => prev + 1);
    } catch (error) {
      console.log('Error fetching movies');
    }
  }
  useEffect(() => {

    const options = {
      rootMargin: '0px 0px -50% 0px',
      threshold: 0.5
    };

    const handlePlay = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (document.getElementById(entry.target.id)) {
            document.getElementById(entry.target.id).play();
          }
        } else {
          if (document.getElementById(entry.target.id)) {
            document.getElementById(entry.target.id).pause();
          }
        }
      });
    };

    let observer = new IntersectionObserver(handlePlay, options);


    data.forEach((curr, i) => {
      observer.observe(document.getElementById("videoRef" + i));

      return () => {
        observer.unobserve(document.getElementById("videoRef" + i));
      }
    });
  });

  return (
    <>
      <Head>
        <title>Playeon - Explore Content</title>
        <meta name="description" content="Explore content at playeon and watch whatever you like we deliver wide range of content so you will not get bored while using playeon." />
      </Head>
      <div className='container mtmb-10'>
        <div className='section mb-3'>
          <h1>Explore Content</h1>
          <InfiniteScroll
            style={{ overflow: 'hidden' }}
            hasMore={hasMore}
            next={fetchDataOnScroll}
            loader={<EndLoader />}
            endMessage={<EndMessage message={'More Content Comming Soon!'} />}
            dataLength={data.length}
          >

            {data.map((item, i) => (
              <ExploreContentCard
                isMovie={item.movie}
                isSeries={item.series}
                itemId={item._id}
                index={i}
                link={item._id}
                img={item.imgSmPoster}
                shortLikes={item.likes}
                movieViews={item.views}
                moiveTilte={item.title}
                moiveDescription={item.description}
                shortVideo={item.shortVideo}
                genre={item.genre}
                episodes={item.episodes}
                type={item.type}
                user={user} />
            ))}
          </InfiniteScroll>
        </div>
      </div>

    </>
  );
};


export const getServerSideProps = async ctx => {

  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/explore`, { headers: { Authorization: token }, params: { pageNumber: 1 } });
    return { props: { exploreData: res.data } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};

export default index;
