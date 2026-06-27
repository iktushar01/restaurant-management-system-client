import React from "react";
import { Outlet } from "react-router";
import Header from "../../Shared/Header/Header";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 w-full max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
