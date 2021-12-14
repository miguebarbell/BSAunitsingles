import React from 'react'
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
    return (
        <div>
            <Announcement/>
            <Slider/>
            <Categories/>
            <FeaturedProducts/>
        </div>
    )
}

export default Home