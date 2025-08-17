import React from 'react';
import Header from '../../Shared/Header/Header';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <Header/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;