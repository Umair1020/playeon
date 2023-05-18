import { useRouter } from 'next/router';
import React from 'react'
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MovieCard from '../../components/movie-card/MovieCard';
import MovieList from '../../components/movie-list/MovieList';
import ProfilePage from '../../components/profile/ProfilePage';

const UserProfile = ({ user }) => {
    const router = useRouter();
    const { username } = router.query;

    return (
        <>
            <ProfilePage user={user} router={router} />
            <MovieList  user={user} router={router} />
        </>
    )
}

export default UserProfile