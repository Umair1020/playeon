import Head from "next/head";
import LandingPage from "../components/landingpage/LandingPage";
import React, { useContext } from "react";
import HeadTags from "../components/layout/HeadTags";
import { AdvertismentContext } from "../utils/context/adContext";
import { ShowAdvertistmentContext } from "../components/layout/Layout";

const index = () => {

  const [showAdvertisment, setShowAdvertisment] = useContext(ShowAdvertistmentContext)
  
  React.useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      localStorage.removeItem('user');
    }
    setShowAdvertisment(true);
    window.localStorage.setItem('SHOW_ADVERTISMENT', JSON.stringify(showAdvertisment))
  }, []);

  return (
    <>

      <HeadTags />
      <LandingPage />

    </>
  );
};

export default index;

