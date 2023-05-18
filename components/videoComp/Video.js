import React, { useState, useEffect } from 'react'
import styles from './Video.module.css'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
// import Image from './cancel.png'
import baseUrl from '../../utils/baseUrl'
// import VideoPlayer from './VideoPlayer'
import BeforeAfter from './BeforeAfter'
const Video = ({ src, sub, user ,view,view720 }) => {
    const router = useRouter();
    const id = user._id
console.log(view)
const handleContextMenu = (event) => {
    event.preventDefault();
};
    useEffect(() => {
        window.onpopstate = async () => {
            try {
                const send = await axios.delete(`${baseUrl}/signup/delete/${id}`)
                router.push('/home')
                console.log(send)
            } catch (e) {
                Router.push('/')
                console.log(e)
            }
        };
    }, []);
    const del = async () => {
        {
            try {
                const send = await axios.delete(`${baseUrl}/signup/delete/${id}`)
                router.push('/home')
                console.log(send)
            } catch (e) {
                Router.push('/')
                console.log(e)
            }
        }
    }

    return (
        <>

            <BeforeAfter src={src} view={view} view720={view720} />

            <track
                label='English'
                kind='subtitles'
                srcLang='en'
                src={sub}
                default

            />
           
            <button className='set' onClick={del} onContextMenu={handleContextMenu}>
                <div className={styles.crossicon} >
                    <div className={styles.crossline}></div>
                    <div className={styles.crossline}></div>
                </div>
            </button>


        </>
    )
}

export default Video