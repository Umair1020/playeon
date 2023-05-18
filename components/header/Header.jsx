import React, { useRef, useEffect, useContext, useState } from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';
import DropDownComp from '../common/DropDownComp';
import Search from '../SearchComponent/Search';
import { ThemeContext } from '../../utils/context/theme';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import MobileSearch from '../SearchComponent/MobileSearch';

const Header = ({ user: { profilePicture, username, name, email, _id } }) => {

    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [donationSize, setDonationSize] = useState(0);
    const [giveawaySize, setGiveawaySize] = useState(0);

    const headerNav = [
        {
            display: 'Home',
            path: '/home'
        },
        {
            display: 'Movies',
            path: '/movies'
        },
        {
            display: 'Series',
            path: '/series'
        },
        // {
        //     display: 'Explore',
        //     path: '/explore'
        // }
    ];
    const headerRef = useRef(null);
    const router = useRouter();
    useEffect(() => {
        const getDonationSize = async () => {
            const res = await axios.get(`${baseUrl}/funding/getsize`);
            setDonationSize(res.data);
        }
        getDonationSize();
    }, [])

    useEffect(() => {
        const getGiveawaySize = async () => {
            const res = await axios.get(`${baseUrl}/giveaway/getsize`);
            setGiveawaySize(res.data);
        }
        getGiveawaySize();
    }, [])

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);

        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };

    }, []);




    return (
        <>
            <div ref={headerRef} className={styles.header}>
                <div className={`container ${styles.header__wrap}`}>
                    <div className={styles.logo}>
                        <Link href='/home'>
                            <img src="/logotrans.png" alt='Playeon' />
                        </Link>

                        <MobileSearch />
                    </div>


                    <ul className={styles.header__nav}>
                        <Search />
                        {headerNav.map((e, i) => (
                            <li key={i} className={router.pathname === e.path ? styles.active : ''}>
                                <Link href={e.path} >
                                    {e.display}
                                </Link>
                            </li>
                        ))}


                        <a className={styles.headerProfilePicture}
                            onClick={() => setDropDownOpen(!dropDownOpen)}

                        >
                            <div>
                                <img src={profilePicture} alt={name} className={styles.profilePic} />
                                {(giveawaySize > 0) || (donationSize > 0) ?
                                    <span>
                                        <FontAwesomeIcon icon={faBell} />
                                    </span>
                                    :
                                    <span>
                                        <FontAwesomeIcon icon={faBellSlash} />
                                    </span>
                                }
                            </div>
                        </a>

                        {dropDownOpen && <DropDownComp
                            profilePicture={profilePicture}
                            username={username}
                            email={email}
                            CapitilizeFirstLetter={CapitilizeFirstLetter}
                            _id={_id}
                            setDropDownOpen={setDropDownOpen}
                            donationSize={donationSize}
                            giveawaySize={giveawaySize}
                            router={router} />}
                    </ul>



                </div>
            </div>

        </>
    );
};



{/* <button className={isDark ? styles.dark : styles.light} onClick={toggleTheme}>{isDark ? <i class="far fa-moon"></i> : <i class="far fa-lightbulb"></i>}</button> */ }

export default Header;






