import React from 'react'
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import {useDispatch} from "react-redux";
import {resetLogin} from "../redux/userRedux";

const Home = () => {

    const dispatch = useDispatch()
    dispatch(resetLogin())
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