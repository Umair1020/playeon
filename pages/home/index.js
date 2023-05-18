import Head from 'next/head';
import React, { createContext, useState, useEffect } from 'react';
import HeroSLide from '../../components/hero-slide/HeroSLide';
import MovieList from '../../components/movie-list/MovieList';
import { useRouter } from 'next/router';

const index = ({user}) => {
    const router = useRouter();
    // console.log(user.name)
    return (
        <>
            <Head>
                <title>Playeon - Watch Movies Online , Watch Series Online</title>
                <meta name="description" content="All the content you need to relax and enjoy we got your back at Playeon by providing you everything in one place with cheap subscription packages." />
            </Head>
            <HeroSLide user={user} />

            <div className="container">
                {/* <MovieList genre={'action,comedies,sci-fi'} user={user} /> */}
                <MovieList genre={'action'} user={user} />
                <MovieList genre={'comedies'} user={user} />
                <MovieList genre={'crime'} user={user} />
                <MovieList genre={'dramas'}  user={user} />
                <MovieList genre={'horror'} user={user} />
                <MovieList genre={'romance'} user={user} />
                <MovieList genre={'sci-fi'} user={user} />
                <MovieList genre={'thriller'} user={user} />
                <MovieList genre={'anime'} user={user} />
                <MovieList genre={'award-winning'} user={user} />
                <MovieList genre={'children & fantasy'} user={user} />
                <MovieList genre={'classics'} user={user} />
                <MovieList genre={'documentaries'} user={user} />
                <MovieList genre={'fantasy'} user={user} />
                <MovieList genre={'hollywood'} user={user} />
                <MovieList genre={'music & musical'} user={user} />
                <MovieList genre={'sports'} user={user} />
                
            </div>

        </>
    );
};

export default index;