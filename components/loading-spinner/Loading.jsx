import React from 'react';
import styles from './loading.module.scss';

const Loading = () => {
    return (
        <>
            <div className={styles.body}>
                <span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className={styles.base}>
                    <span></span>
                    <div className={styles.face}></div>
                </div>
            </div>

        </>
    );
};

export default Loading;
