import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function Main(props) {
    const baseUrl = props.baseUrl;
    const params = useParams();
    const search = props.search;
    const query = search ? `q=${params.query}&` : "";
    const [showsData, setShowsData] = useState(props.showsData);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);
    const [hasError, setError] = useState(null);
    const [lastPage, setLastPage] = useState(false);

    const loadMore = () => {
        setPageNumber(prevValue => prevValue + 1);
    }

    useEffect(() => {
        setShowsData([]);
    }, [search, query])

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(`${baseUrl}${query}page=${pageNumber}`).then(res => res.json()).then(res => {
            if (res.pages === pageNumber) {
                setLastPage(true);
            }
            if (res.tv_shows?.length) {
                setShowsData(prevsData => [...prevsData, ...res.tv_shows]);
            } else {
                setError(true);
            }
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });


    }, [pageNumber, baseUrl, query])

    return (
        <div>
            <h3> Shows Details </h3>
            <div className='show-listings'>

                {
                    !!showsData.length && showsData.map((show, index) => (
                        <div className='show-item' key={show.id + "-" + index}>
                            <Link to={`/show/${show.permalink}`}>
                                <div>
                                    <img src={show?.image_thumbnail_path} alt={show.name} />
                                    <h4> {show.name} </h4>
                                    <p> Started on - {show.start_date} </p>
                                    <p> Current status - {show.status} </p>
                                </div>

                            </Link>
                        </div>
                    ))
                }

            </div >

            <div className='loading-box'>
                {
                    hasError && <div> No Result Found. </div>
                }
                {!hasError && <div className='loading-wrapper'>
                    {loading ? <div className='loading-state'>
                        loading...
                    </div> : <div className='load-more-box'>

                        {!lastPage ?
                            <label onClick={() => loadMore()}>
                                Load More
                            </label> : <label aria-disabled> Nothing to show more </label>
                        }
                    </div>
                    }
                </div>
                }
            </div>

        </div>
    )

}
