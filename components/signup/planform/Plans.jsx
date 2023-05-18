import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../utils/context/userContext';
import styles from './planform.module.scss';
import { useRouter } from "next/router";
const Plans = () => {

    const router = useRouter();
    const userDetails = useContext(UserContext);
    const [user, setUser] = userDetails;
    const { plan, planPrice } = user;
  
    const [submitDisable, setSubmitDisable] = useState(true);
    // useEffect(() => {
    //     const isPlan = Object.values({ plan }).every(item => Boolean(item));
    //     isPlan ? setSubmitDisable(false) : setSubmitDisable(true);
    // }, [user])
    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setUser(prev => ({ ...prev, [name]: value }));
    // }
 


    return (
        <>
            <div className={styles.center__container}>
                <div className={styles.main__content}>
                    <div className={styles.plan__container}>

                        <div>
                            <div className={styles.header}>
                                <span>STEP <b>2</b> OF <b>4</b></span>
                                <h1>Choose monthly subscription package</h1>
                            </div>

                            <div className={styles.changeanytime}>
                                <ul>
                                    <li>
                                        <i class="fas fa-check"></i>
                                        <span>Watch all you want.</span>
                                    </li>
                                    <li>
                                        <i class="fas fa-check"></i>
                                        <span>Recommendations just for you.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.plan__grid}>

                            <div className={styles.plan__grid__header}>
                                <div className={styles.plan__grid__content}>
                                    {/* <label onClick={() => setUser(prev => ({ ...prev, planPrice: '200' }))}>
                                        <input type='radio' name='plan' value='planOne' onChange={handleChange} />
                                        <span className={user.plan === 'planOne' ? styles.active : ''}>Pack 1</span>
                                    </label> */}
                                    {/* <label onClick={() => setUser(prev => ({ ...prev, planPrice: '300' }))}>
                                        <input type='radio' name='plan' value='planTwo' onChange={handleChange} />
                                        <span className={user.plan === 'planTwo' ? styles.active : ''}>Pack 2</span>
                                    </label>
                                    <label onClick={() => setUser(prev => ({ ...prev, planPrice: '400' }))}>
                                        <input type='radio' name='plan' value='planThree' onChange={handleChange} />
                                        <span className={user.plan === 'planThree' ? styles.active : ''}>Pack 3</span>
                                    </label> */}
                                </div>
                            </div>


                            <table className={styles.plan__grid__talbe}>
                                <tbody>
                                    <tr>
                                        <td>Monthly Subscription</td>
                                        <td className={user.plan === 'planOne' ? styles.active : ''}>Rs 100</td>
                                        {/* <td className={user.plan === 'planTwo' ? styles.active : ''}>Rs300</td>
                                        <td className={user.plan === 'planThree' ? styles.active : ''}>Rs400</td> */}
                                    </tr>
                                    <tr>
                                        <td>Video Quality</td>
                                        <td className={user.plan === 'planOne' ? styles.active : ''}>HD movies</td>
                                        {/* <td className={user.plan === 'planTwo' ? styles.active : ''}>Better</td>
                                        <td className={user.plan === 'planThree' ? styles.active : ''}>Best</td> */}
                                    </tr>
                                  
                                </tbody>
                            </table>
                        </div>

                    </div>


                    <div className={styles.btn__container}>
                        <button onClick={() => router.push('/signup/payment')}>
                            NEXT
                        </button>
                    </div>


                </div>
            </div>
        </>
    );
};

export default Plans;
