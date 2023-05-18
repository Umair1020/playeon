import React from 'react';
import styles from './moviegrid.module.scss';
import MovieGridCard from './MovieGridCard';

const MovieGrid = ({ movie, user }) => {
    return (
        <>

            <div className={styles.movie_grid}>
                {
                    movie.map((item, i) => <MovieGridCard
                        movieId={item._id}
                        index={i}
                        link={item._id}
                        img={item.imgSmPoster}
                        movieLikes={item.likes}
                        movieViews={item.views}
                        user={user} />)
                }
            </div>
        </>
    );
};

export default MovieGrid;
