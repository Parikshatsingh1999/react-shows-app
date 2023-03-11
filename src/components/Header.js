import React, { useState } from 'react';
import img from "../assets/tv-logo.jpg";
import bgimg from "../assets/bg-image.jpg";
import bgimgM from "../assets/images.jpeg";
import { useNavigate } from "react-router-dom";
export default function Header() {

    const name = "TV Shows";
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search/${query}`);
    }

    const sendHome = () => {
        setQuery("");
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
      <div class="main_page">
        <div class="images">
        <img src={bgimg} alt="bg-image" class="desktop" />
        <img src={bgimgM} alt="bg-image" class="mobiled" />
        </div>
            <div class="content_part">
        <div>
            <h1 class="main_headingss">Search for Unlimited movies, TV shows and more.</h1>
        </div>
        <div className='search-box head-item'>
                <input placeholder='Search for your favourite shows' value={query} onInput={(e) => setQuery(e.target.value)} />
                <button onClick={() => handleSearch()}> Search </button>
            </div>
            </div>
            </div>
        </>
    )
}
