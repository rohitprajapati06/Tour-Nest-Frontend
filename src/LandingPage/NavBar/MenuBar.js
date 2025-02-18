import React from "react";
 import NavBar from "../NavBar/NavBar";
 import BottomNavbar from "../NavBar/BottomNav";
 import './Menu.css'

const MenuBar = () => {
    return (
        <div>
            {/* Top Navbar */}
            <NavBar />

            {/* Bottom Navigation */}
            <BottomNavbar />
        </div>
    );
};

export default MenuBar;
