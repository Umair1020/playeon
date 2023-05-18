import { faF, faFaceMehBlank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './landingpage.module.scss';

const LandingPage = () => {
    const year = new Date().getFullYear();
    const router = useRouter();
    return (
        <>
            <header className={styles.header}>
                <nav>
                    <ul>
                        <li>
                            <Link href='/login'>
                                <button className={styles.login__btn}>Log In</button>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className={styles.header__content}>
                    <div className={styles.logo}>
                        <img src="/logotrans.png" alt='playeon' />
                    </div>
                    <div className={styles.logoHeading}>
                        <img src='./name.png' alt='playeon' />
                    </div>
                    <div className={styles.header__text__1}>Watch Thousands of Series and Movies.</div>

                    <Link href='/signup'><button className={styles.btn}>Start Your Journey</button></Link>

                </div>
            </header>

            <section className={styles.categories}>
                <h4 className={styles.h4__heading}>Included in all plans.</h4>
                <div className={styles.text__xl}>Content You Love</div>
                <div className={styles.sub__text}>Stream full seasons of exclusive series, current-season episodes, hit movies and more.</div>

                <div className={styles.covers}>
                    <div className={styles.cover__1}>
                        <div className={styles.cover__gradient}></div>
                        <div className={styles.cover__text}>
                            <div className={styles.sub__title}>Past & Current Seasons</div>
                            <h3>Series</h3>
                        </div>
                    </div>
                    <div className={styles.cover__2}>
                        <div className={styles.cover__gradient}></div>
                        <div className={styles.cover__text}>
                            <div className={styles.sub__title}>New & Classic</div>
                            <h3>Movies</h3>
                        </div>
                    </div>
                    <div className={styles.cover__3}>
                        <div className={styles.cover__gradient}></div>
                        <div className={styles.cover__text}>
                            <div className={styles.sub__title}>Netlfix</div>
                            <h3>Netlfix Orginals</h3>
                        </div>
                    </div>
                    <div className={styles.cover__4}>
                        <div className={styles.cover__gradient}></div>
                        <div className={styles.cover__text}>
                            <div className={styles.sub__title}>Amazon</div>
                            <h3>Amazon Prime</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.categoriesTv}>
                <div className={styles.categoriesTvSection}>

                    <div className={styles.leftPanel}>
                        <div className={styles.text__xl_2}>Stream Now</div>
                        <div className={styles.sub__text}>Watch your favourite Hollywood, Bollywood movies and Series only on playeon.</div>
                    </div>

                    <div className={styles.rightPanel}>
                        <div className={styles.rightPanelContainer}>
                            <img src='./tv.png' />
                            <div className={styles.rightPanelVideo}>
                                <video
                                    playsInline
                                    autoPlay
                                    loop
                                    muted
                                >
                                    <source src='./videotv.m4v' type='video/mp4' />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


            <section className={styles.categories}>
                <h4 className={styles.h4__heading}>Our Plan</h4>
                <div className={styles.text__xl}>Monthly Pricing</div>

                <div className='landingcard__container'>
                    <div className='landingcard'>
                        <h3 className="card__header">Monthly Subscription</h3>
                        <p className="card__info">Amount : <b className='ammountLanding'>Rs 100</b></p>
                        <p className="card__info">Video Quality : HD movies</p>
                    </div>
                    {/* <div className='landingcard'>
                        <h3 class="card__header">Pack 2</h3>
                        <p class="card__info">Monthly Price : <b className='ammountLanding'>Rs 300</b></p>
                        <p class="card__info">Video Quality : Better</p>
                        <p class="card__info">Features : HD plus Movies</p>
                    </div>
                    <div className='landingcard'>
                        <h3 class="card__header">Pack 3</h3>
                        <p class="card__info">Monthly Price : <b className='ammountLanding'>Rs 400</b></p>
                        <p class="card__info">Video Quality : Best</p>
                        <p class="card__info">Features : HD plus Movies + Originals</p>
                    </div> */}

                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footer__container}>
                    <div className={styles.footer__list}>
                        <ul>
                            <li className={styles.list__head}>PLAYEON</li>
                            {/* <li><a href="#">Streaming Library</a></li>
                            <li><a href="#">Live TV</a></li>
                            <li><a href="#">Live News</a></li>
                            <li><a href="#">Live Sports</a></li> */}
                        </ul>
                        <div className={styles.googleplayIcon}>
                            <a href='https://play.google.com/store/apps/details?id=com.playeon.twa' target='_blank' rel='norefferer'>
                                <img src='./googleplay.png' />
                            </a>
                        </div>
                    </div>
                    <div className={styles.divider}></div>
{/*                     
                    <div className={styles.social__links}>
                        <Link href={'/'}>
                            <FontAwesomeIcon icon="fa-brands fa-facebook" />
                        </Link>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram-square"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div> */}

                    <div className={styles.terms}>
                        <ul>
                            <li>&copy; {year} Playeon</li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/refund">Refund Policy</Link></li>
                            <li><Link href="/terms&condtion">Terms & Conditions</Link></li>
                            <li><Link href="/faqs">Faqs</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};





export default LandingPage;
