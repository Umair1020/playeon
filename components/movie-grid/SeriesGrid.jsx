import React from 'react';
import styles from './moviegrid.module.scss';
import SeriesGridCard from './SeriesGridCard';

const SeriesGrid = ({ series, user }) => {
    return (
        <>
            <div className={styles.movie_grid}>
                {
                    series.map((item, i) => <SeriesGridCard
                        seriesId={item._id}
                        index={i}
                        link={item._id}
                        img={item.imgSmPoster}
                        seriesLikes={item.likes}
                        seriesViews={item.views}
                        user={user} />)
                }
            </div>
        </>
    )
}

export default SeriesGrid