import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function Main(props) {
    const baseUrl = props.baseUrl;
    const params = useParams();
    const search = props.search;
    const heading = "Most Popular";
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
        setPageNumber(1);
    }, [search, baseUrl, query]);


    useEffect(() => {
        setLoading(true);
        setError(false);
        setLastPage(false);
        fetch(`${baseUrl}${query}page=${pageNumber}`).then(res => res.json()).then(res => {
            if (pageNumber >= res.pages) {
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

    }, [pageNumber])

    return (
        <div>
            <h3 className="shows_title"> {!query ? heading : `Showing Result for ${params.query}`}  </h3>
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
                {
                    !hasError && <div className='loading-wrapper'>
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
