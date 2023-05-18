import React from 'react'
import Navbar from '../components/landing-navbar/Navbar';
import { faAddressBook, faLocationDot, faLocationPin, faMapPin, faPhone, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    return (
        <>
            <Navbar />
            <section className="contact-col">

                <h1>Contact Us</h1>
                <div className="contact__container">
                <p><b><FontAwesomeIcon icon={faPhone} className='contactIcons' /></b> 02134120126</p>
                <p><b><FontAwesomeIcon icon={faLocationDot} className='contactIcons' /></b> Plot 324 Block 7/8 CP BERAR SOCIETY DHORAJI, Karachi </p>
                <div className="contact__social__icons">
                    <p>
                        <a href='https://www.facebook.com/profile.php?id=100087184646779' target='_blank' rel='norefferer'>
                            <FontAwesomeIcon
                                icon={faFacebookSquare}
                                className="contactSocialIcons facebook" />
                        </a>
                    </p>
                    <p>
                        <a href='https://www.instagram.com/playeon.com.pk/'
                            target='_blank' rel='norefferer'>
                            <FontAwesomeIcon
                                icon={faInstagramSquare}
                                className="contactSocialIcons Instagram" />
                        </a>
                    </p>
                    <p>
                        <a>
                            <FontAwesomeIcon
                                icon={faTwitterSquare}
                                className="contactSocialIcons twitter" />
                        </a>
                    </p>
                </div>
            </div>
              
            </section>
        </>
    )
}

export default Contact




