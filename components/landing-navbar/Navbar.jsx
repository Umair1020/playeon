import Link from 'next/link';
import React from 'react';
import styles from './navbar.module.scss';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Link href={'/'}>
                    <img src="/logotrans.png" alt='Playeon' />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
