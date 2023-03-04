import React, { useState } from 'react';
import img from "../assets/tv-logo.jpg";
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
        <div className='main-wrapper-header'>
            <div className='logo-box head-item'> <img src={img} alt="logo" /> </div>
            <div className='search-box head-item'>
                <input value={query} onInput={(e) => setQuery(e.target.value)} />
                <button onClick={() => handleSearch()}> Search </button>
            </div>
            <div className='title-box head-item'>

                <h2 onClick={() => sendHome()}>  {name} </h2>


            </div>
        </div>
    )
}
