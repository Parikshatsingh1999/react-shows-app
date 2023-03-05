import React, { useRef } from 'react';
import img from "../assets/tv-logo.jpg";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const name = "TV Shows";
    const queryRef = useRef()
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search/${queryRef.current.value}`);
    }

    const sendHome = () => {
        navigate("/");
    }

    return (
        <div className='main-wrapper-header'>
            <div className='logo-box head-item'> <img src={img} alt="logo" /> </div>
            <div className='search-box head-item'>
                <input ref={queryRef} />
                <button onClick={() => handleSearch()}> Search </button>
            </div>
            <div className='title-box head-item'>
                <h2 onClick={() => sendHome()}>  {name} </h2>
            </div>
        </div>
    )
}
