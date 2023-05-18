import { createContext, useState } from 'react';
import Navbar from '../../components/landing-navbar/Navbar';
import SignupPage from '../../components/signup/SignupPage';


export const UserContext = createContext();

const index = () => {
  return (
    <>
      <Navbar />
      <SignupPage />
    </>
  );
};

export default index;


