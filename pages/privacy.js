import React from 'react'
import Navbar from '../components/landing-navbar/Navbar';

const Privacy = () => {
    return (
        <>
            <Navbar />
            <section className="privacy-col">

                <h1>Privacy Policy</h1>

                <p><b>1-</b> In sign-up process, Playeon asks for Name, Email, Phone Number, password and payment details. </p>

                <p><b>2-</b> Playeon will never save your  payment details, you have to manually pay for subscription (Renewal Subscription) </p>

                <p><b>3-</b> When the Subscription end, you have to pay manually for next month subscription in 1 step only.</p>

                <p><b>4-</b> If there is a unknown transaction happened from your card, that will not be from PLAYEON. </p>

                <p><b>5-</b> Playeon is not responsible for any unknown transaction from your card. </p>

                <p><b>6-</b> Playeon will notify you about their changes and improvement in their service.</p>

                <p><b>7-</b> For Security purposes, we keep updating our security to keep your information secure and prevention of fraud </p>

                <p><b>8-</b> For any type of complaint or feedback you can give through website/app.</p>
                <hr />
            </section>
        </>
    )
}

export default Privacy