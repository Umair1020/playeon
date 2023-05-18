import Link from "next/link";
import styles from '../header/header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faHandHoldingDollar, faMoon, faLightbulb, faRss, faArrowRightFromBracket, faGifts } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../../utils/authUser';
const DropDownComp = ({ CapitilizeFirstLetter,
    router,
    profilePicture,
    username,
    email,
    _id,
    setDropDownOpen,
    isDark,
    toggleTheme,
    donationSize,
    giveawaySize }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        await logoutUser(email, _id);
    }
   
    return (
        <div className={styles.wrapper} onMouseLeave={() => setDropDownOpen(false)}>
            <ul className={styles.menu__bar}>
                <li className={router.pathname === `/profile/${_id}` ? styles.active : ''}>
                    <Link href={`/profile/${_id}`}>
                        <a onClick={() => setDropDownOpen(false)}>
                            <div className={styles.menu__icon}>
                                <img src={profilePicture} alt="Name" className={styles.menu__profile} />
                            </div>
                            {CapitilizeFirstLetter(username)}

                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/giveaway' ? styles.active : ''}>
                    <Link href='/giveaway'>
                        <a onClick={() => setDropDownOpen(false)}>
                            <div className={styles.menu__icon}>
                                <FontAwesomeIcon icon={faGifts} />
                            </div>
                            Giveaways ( {giveawaySize} )
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/donate' ? styles.active : ''}>
                    <Link href='/donate'>
                        <a onClick={() => setDropDownOpen(false)}>
                            <div className={styles.menu__icon}><FontAwesomeIcon icon={faHandHoldingDollar} /></div>
                            Donate Now ( {donationSize} )
                        </a>
                    </Link>
                </li>
                {/* <li>

                    <a onClick={toggleTheme}>
                        <div className={styles.menu__icon} >
                            {isDark ?
                                <FontAwesomeIcon icon={faMoon} /> :
                                <FontAwesomeIcon icon={faLightbulb} />
                            } </div>
                        Change Theme
                    </a>

                </li> */}
                <li className={router.pathname === '/request' ? styles.active : ''}>
                    <Link href='/request'>
                        <a onClick={() => setDropDownOpen(false)}>
                            <div className={styles.menu__icon}>
                                <FontAwesomeIcon icon={faClapperboard} />
                            </div>
                            Request Movies
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/feedback' ? styles.active : ''}>
                    <Link href='/feedback'>
                        <a onClick={() => setDropDownOpen(false)}>
                            <div className={styles.menu__icon}><FontAwesomeIcon icon={faRss} /></div>
                            Feedback
                        </a>
                    </Link>
                </li>
                <li>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.menu__icon}><FontAwesomeIcon icon={faArrowRightFromBracket} /></div>
                        <button type="submit">Logout</button>
                    </form>
                </li>
            </ul>
        </div>
    )
}


export default DropDownComp;