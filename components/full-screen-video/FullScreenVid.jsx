import React from 'react';
import axiosClient from '../../utils/axiosClient';

const FullScreenVid = props => {
    const category = {
        movie: 'movie',
        tv: 'tv'
    }
    const getVideos = (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, { params: {} });
    }
    const getMovies = async () => {
        const video = await getVideos(category.movie, props.id);
        if (video.results.length > 0) {
            const movieSrc = 'https://www.youtube.com/embed/' + video.results[1].key + '?autoplay=1';
            document.getElementById('myIframe').setAttribute('src', movieSrc);
        }

    }
    getMovies();

    return (
        <>
            <iframe id='myIframe' width="560" height="315"  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                    zIndex: 99999
                }}
            ></iframe>
        </>
    );
};

export default FullScreenVid;
