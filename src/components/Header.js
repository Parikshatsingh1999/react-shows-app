import React, { useRef } from 'react';
import img from "../assets/tv-logo.jpg";
import bgimg from "../assets/desktop-image.jpeg";
import bgimgM from "../assets/mobile-image.jpeg";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const name = "TV Shows";
    const queryRef = useRef()
    const navigate = useNavigate();

    const handleSearch = () => {
        if (queryRef.current.value.trim().length) {
            navigate(`/search/${queryRef.current.value}`);
        }
    }

    const sendHome = () => {
        queryRef.current.value = "";
        navigate("/");
    }

    return (
        <>
            <div className='main-wrapper-header'>
                <div className='logo-box head-item'> <img src={img} alt="logo" /> </div>
                <div className='title-box head-item'>
                    <h2 onClick={() => sendHome()}>  {name} </h2>
                </div>
            </div>
            <div className="main_page">
                <div className="images">
                    <img src={bgimg} alt="backgound" className="desktop" />
                    <img src={bgimgM} alt="background" className="mobiled" />
                </div>
                <div className="content_part">
                    <div>
                        <h1 className="main_headingss">Search for Unlimited movies, TV shows and more.</h1>
                    </div>
                    <div className='search-box head-item'>
                        <input ref={queryRef} placeholder="Search Your fav shows" />
                        <button onClick={() => handleSearch()}> Search </button>
                    </div>
                </div>
            </div>
        </>
    )
}
