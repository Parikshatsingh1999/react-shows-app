import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Show() {
    const { name } = useParams();
    const baseUrl = "https://www.episodate.com/api/show-details?q=";

    const [showData, setShowData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasError, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch(`${baseUrl}${name}`).then(res => res.json()).then(res => {
            if (res.tvShow) {
                setShowData(res.tvShow);
            } else {
                setError(true);
            }
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });


    }, [name]);

    return (
        <div className='show-wrapper'>
            {
                loading && <div>
                    Getting Show Details ...
                </div>
            }
            {showData &&
                <div className='main-wrap'>
                    <h1> {name.toUpperCase()} </h1>
                    <div className='show-wrapper-main'>
                        <div className='container'>
                            <div className='topSection'>
                                <img src={showData.image_path} alt={showData.name} />
                                <div className='divsss'>
                                    <h3> Ratings - {Number(showData.rating).toFixed(2)}/10 </h3>
                                    <h4> Started - {showData.start_date} </h4>
                                    {
                                        showData.network && <h3>Aired On- {showData.network} </h3>
                                    }
                                    {showData.genres && <div className='genre-list'>
                                        <label> Genres - </label>
                                        {
                                            showData.genres.map((item) => (<span key={item}> {item} </span>))
                                        }
                                    </div>
                                    }
                                </div>
                            </div>
                            <p> {showData.description} </p>
                            {
                                showData.pictures && <div className='show-thumbs-box'>
                                    {
                                        showData.pictures.map((pic, index) => (
                                            <div className='single-pic' key={index}>
                                                <img src={pic} alt={showData.name} />
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            {
                                showData.episodes && !!showData.episodes.length && <div>
                                    <h2> Episodes </h2>
                                    <div className='episodes-wrapper'> {
                                        showData.episodes.map((episode, index) => (
                                            <div className='single-episode' key={episode.episode + "-" + index}>
                                                <div> <p> Name :  </p> <b> {episode.name} </b> </div>
                                                <div> <p> Season :  </p> <b> {episode.season} </b>  </div>
                                                <div> <p> Episode :  </p> <b> {episode.episode} </b> </div>
                                                <div> <p> Date :  </p> {episode.air_date}  </div>
                                            </div>
                                        ))
                                    }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            {
                hasError && !loading && <div>
                    Cant Get Show Details, Please try again later!
                </div>
            }
        </div >
    )
}
