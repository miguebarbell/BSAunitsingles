import React from 'react'
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Footer from "../components/Footer"
import Products from "../components/Products";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Announcement/>
            <Slider/>
            <Categories/>
            <Products/>
            {/*<Footer/>*/}
        </div>
    )
}

export default Home