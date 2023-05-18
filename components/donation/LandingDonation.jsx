import Link from 'next/link';
import React from 'react';
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';
// import styles from './donation.module.scss';
import styles from '../giveawayComp/giveaway.module.scss'

const LandingDonation = ({ donations }) => {
    if (donations.length === 0) {
        return (
            <div className='noContent'>
                <h1>No donations available right now!</h1>
            </div>
        )
    }
    return (
        <>
            <div className='container mtmb-10'>
                <div className='section mb-3'>
                    <h1>Donate</h1>
                    <div className='giveaway__grid'>
                        {donations.map((donation) => {
                            const { _id, title, img } = donation;
                            return (
                                <>

                                    <Link href={`/donate/${_id}`}>
                                        <div className={styles.giveaway__grid}>
                                            <div className={styles.giveaway__poster}>
                                                <img src={img} />
                                            </div>
                                            <div className={styles.giveaway__title}>
                                                <h3>{CapitilizeFirstLetter(title)}</h3>
                                                <div className={styles.giveaway__footer}>
                                                    <button>Donate</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>



    )
}

export default LandingDonation