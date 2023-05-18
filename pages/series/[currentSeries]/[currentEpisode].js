import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../../../utils/baseUrl';
import Video from '../../../components/videoComp/Video';


const CurrentEpisode = ({ episodes ,user }) => {
    console.log(episodes);
    return (

        <Video src={episodes[0].video} sub={null} user={user} />
    )
}

export const getServerSideProps = async ctx => {

    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/series/episode/${ctx.query.currentEpisode}`, { headers: { Authorization: token } });
        const { episodes } = res.data;
        return { props: { episodes } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};
export default CurrentEpisode