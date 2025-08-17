import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-4 mt-20 text-center border-t border-gray-800">
            <p className="text-sm">© {new Date().getFullYear()} DineFlow. All rights reserved.</p>
            <p className="text-xs text-gray-400 mt-1">Designed and developed with ❤️</p>
        </footer>
    );
};

export default Footer;