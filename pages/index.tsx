import React from "react";
import ProfileImage from "../components/ProfileImage";
import HomeText from "../components/HomeText";
import Head from "next/head";

const Home: React.FC = () => (
  <>
  <Head>
    <title>Home</title> 
    <meta name="description" content="Home display" /> 
  </Head>
  <div className="home">
    <p className="head-text">Ivan Ershov</p>
    <ProfileImage />
    <HomeText />
  </div>
  </>
);

export default Home;
