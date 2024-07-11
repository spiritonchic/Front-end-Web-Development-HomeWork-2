import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import icon from "../public/icon.ico"

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href={icon.src} /> 
        <meta name="author" content="Ivan Ershov" /> 
      </Head>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
