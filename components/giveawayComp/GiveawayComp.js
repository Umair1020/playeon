import React, { useState } from 'react'
import styles from './giveaway.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';
import { ApplyForGiveAway } from '../../utils/giveawayActions';

const GiveawayComp = ({ giveaway, setError, setShowToaster, router, user }) => {
    const [candidates, setCandidates] = useState(giveaway.participants);
    const isParticipated = candidates.length > 0 && candidates.filter(candidates => candidates.user === user._id).length > 0;;
    return (

        <div className={styles.giveaway__grid} key={giveaway._id}>
            <div className={styles.giveaway__poster}>
                <img src={giveaway.poster} alt={giveaway.title} />
            </div>
            <div className={styles.giveaway__title}>
                <h3>{CapitilizeFirstLetter(giveaway.title)}</h3>
                <span>Participants: {giveaway.participants.length}</span>
            </div>
            <div className={styles.giveaway__footer}>
                {isParticipated ?
                    <button>Applied</button>
                    :
                    <button onClick={() => ApplyForGiveAway(giveaway._id, setShowToaster, setError, router)}>Apply</button>
                }
            </div>
        </div>

    )
}

export default GiveawayComp















