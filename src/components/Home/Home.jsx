import React, { useEffect } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyData, getSearchTerm } from '../../app/actions/dataAction';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPropertyData());
    }, [])

    const { propertyData, searchTerm } = useSelector(state => ({
        propertyData: state.dataReducer.propertyData,
        searchTerm: state.dataReducer.searchTerm
    }))

    console.log(propertyData);

    return (
        <section className="home">
            <div className="search__bar">
                <div className="searchBar__title text-center">
                    <h1>To each their home</h1>
                    <h3>Let’s find a home that’s perfect for you</h3>
                </div>
                <input onChange={(e) => dispatch(getSearchTerm(e.target.value))} className="form-control" type="text" placeholder="Search Area" />
            </div>
            <br />
            {
                propertyData.filter((val) => {
                    if (searchTerm === "") {
                        return val;
                    } else if (
                        val.location.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                        return val;
                    }
                }).map(data => (
                    <div style={{ backgroundImage: `url(${data.homeImg})` }} className="home__container">
                        <div className="headline text-center">
                            <h1>Home to sell</h1>
                            <h3>{data.location}</h3>
                        </div>

                        <div className="bottom">
                            <div className="buttonGroup">
                                <button className="_btn order__btn">Order Now</button>
                                <button className="_btn review__btn">Review</button>
                            </div>
                            <div className="down__arrow">
                                <FontAwesomeIcon className="icon" icon={faChevronDown} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    );
};

export default Home;