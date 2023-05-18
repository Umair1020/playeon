import { useRouter } from 'next/router';
import React from 'react'
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MyUser from '../../components/profile/MyUser';
import ProfilePage from '../../components/profile/ProfilePage';
import styles from './postId.module.css'
const UserProfile = ({ user }) => {
    const router = useRouter();
    const { username } = router.query;

    return (
        <>
        <div className={styles.name}>
            <MyUser user={user} router={router} />
            </div>
            {/* <ProfilePage user={user} router={router} /> */}
        </>
    )
}

export default UserProfile