import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { OutlineButton } from '../button/Button';
import ExploreCard from '../movie-card/ExploreCard';
import styles from './moviegrid.module.scss';

const ExploreGrid = ({ data, user }) => {
    console.log('data >', data);
    return (
        <>
            <div className={styles.movie_grid}>
                {
                    data.map((item, i) => <ExploreCard
                        id={item._id}
                        index={i}
                        link={item._id}
                        type={item.type}
                        img={item.imgSmPoster}
                        likes={item.likes}
                        views={item.views}
                        user={user} />)
                }
            </div>
        </>
    );
}

export default ExploreGrid