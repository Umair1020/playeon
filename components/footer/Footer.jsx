import React from 'react';
import Link from 'next/link';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        {/* <img src='https://assets.nflxext.com/ffe/siteui/vlv3/8f3e38a9-1c2c-4818-99b5-2d9bdff9ad1d/0de0d58a-fb37-4b22-9e94-673bdad33b17/PK-en-20220124-popsignuptwoweeks-perspective_alpha_website_small.jpg' className={styles.demo} /> */}
        <div className={` container`}>
          <div className={`${styles.footer__content__logo}`}>
            <div className={styles.logo}>
              <Link href='/home'>
                <img src='../../name.png' height='40px' width='100%' style={{ objectFit: 'contain' }} />
              </Link>

            </div>
          </div>
          <hr className={styles.dividerR} />
          <div className={`${styles.footer__content__menus}`}>
            <div className={`${styles.footer__content__menu}`}>
              <Link href='/home'>Home</Link>
              <Link href='/terms'>Terms & Conditions</Link>
              <Link href='/refundpolicy'>Refund Policy</Link>
            </div>
            <div className={`${styles.footer__content__menu}`}>
              <Link href='/faq'>FAQ's</Link>
              <Link href='/privacypolicy'>Privacy Policy</Link>
              <Link href='/contactus'>Contact</Link>
            </div>
            <div className={`${styles.footer__content__menu}`}>
              <Link href='/feedback'>Feedback</Link>
              <Link href='/request'>Request Movies</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
