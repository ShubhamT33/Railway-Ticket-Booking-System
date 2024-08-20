import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/HomePage.css';
import instance from './axios.js'

const HomePage = () => {
    const [sourceStation, setSourceStation] = useState('');
    const [destinationStation, setDestinationStation] = useState('');
    const navigate = useNavigate();

    const handleSearchClick = async () => {
        try {
            // Call the API with the source and destination as query parameters
            const response = await instance.get('train/api/trains', {
                params: {
                    source: sourceStation,
                    destination: destinationStation,
                },
            });

            const trains = response.data;
            
            // Navigate to the TrainList page with the train data
            navigate('/trainlist', { state: { trains } });
        } catch (error) {
            console.error('Error fetching trains:', error);
            // Optionally, handle the error or show a message to the user
        }
    };

    const changeBorderSource = (isHovered) => {
        const div = document.getElementById('source');
        if (div) {
            div.style.border = isHovered ? '2px solid black' : '1px solid transparent';
        }
    };

    const changeBorderDestination = (isHovered) => {
        const div = document.getElementById('destination');
        if (div) {
            div.style.border = isHovered ? '2px solid black' : '1px solid transparent';
        }
    };

    useEffect(() => {
        const setDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const todayDate = `${year}-${month}-${day}`;
            const startDateInput = document.getElementById('startDate');
            if (startDateInput) {
                startDateInput.value = todayDate;
            }
        };

        setDate();
    }, []);

    return (
        <div>
            <div className="background-image"></div>
            <div className="container main-content">
                <div className="jumbotron search-jumbotron">
                    <div className='form-group'>
                        <p className="input-label">Source:</p>
                        <input className='form-control'
                            id="source"
                            onMouseOver={() => changeBorderSource(true)}
                            onMouseOut={() => changeBorderSource(false)}
                            type="text"
                            placeholder="Source"
                            value={sourceStation}
                            onChange={(e) => setSourceStation(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <p className="input-label">Destination:</p>
                        <input
                            className="form-control"
                            id="destination"
                            onMouseOver={() => changeBorderDestination(true)}
                            onMouseOut={() => changeBorderDestination(false)}
                            type="text"
                            placeholder="Destination"
                            value={destinationStation}
                            onChange={(e) => setDestinationStation(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-info search-button" onClick={handleSearchClick}>Search</button>
                    </div>

                    
                </div>
            </div>
            <div className="jumbotron content-jumbotron">
                <h1 className="HomePagetitle">Maharashtra Train</h1>
                <p className="content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae laboriosam, in quas magnam
                    quisquam velit ducimus aspernatur voluptas a possimus veritatis tempore architecto reiciendis,
                    blanditiis harum ratione asperiores quae doloribus, ab quam laudantium. Maiores obcaecati natus
                    fugit perspiciatis ducimus hic dicta, iusto eaque eum voluptates repellat inventore optio
                    consequatur omnis itaque animi consequuntur id, molestias impedit eius libero! Est perspiciatis
                    officia eveniet minus at, dolorum earum placeat cupiditate cum fugit quae soluta distinctio
                    voluptatum dolor tempore quo eligendi libero quod qui sunt vitae. Modi incidunt et molestias
                    quae alias sequi illo cumque similique velit esse, delectus corrupti dolorum laudantium
                    cupiditate?
                </p>
            </div>
            <div className="jumbotron content-jumbotron">
                <div className="content-section">
                    <img
                        src="https://images.unsplash.com/photo-1680424852908-f87916958014?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Religious Place"
                        className="content-image"
                    />
                    <div className="content-text">
                        <h2 className="content-title">Religious Place</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ullam quibusdam unde
                            architecto possimus, provident inventore itaque reiciendis at voluptate, nesciunt
                            temporibus laudantium facere. Eum ab aut dolor consequuntur fugiat qui, pariatur
                            perferendis obcaecati id illum architecto temporibus beatae aperiam, laboriosam
                            reiciendis ipsa quam repudiandae odit ex expedita accusantium! Eos?
                        </p>
                    </div>
                </div>
                <div className="content-section">
                    <img
                        src="https://imgs.search.brave.com/Nwl3SJbZzSXvx6-r1Qy9_Km4dQgn9Vz1HjIjBEQKQ-c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjUx/MjcwMzAzL3Bob3Rv/L3RoZS1nYXRld2F5/LW9mLWluZGlhLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz05/U3lHd2hkcXQyQUtL/M0xNOXd0dmYtX1Z3/bzl4RzJScE4wMW02/SHJYQVlFPQ"
                        alt="Historical Place"
                        className="content-image"
                    />
                    <div className="content-text">
                        <h2 className="content-title">Historical Place</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ullam quibusdam unde
                            architecto possimus, provident inventore itaque reiciendis at voluptate, nesciunt
                            temporibus laudantium facere. Eum ab aut dolor consequuntur fugiat qui, pariatur
                            perferendis obcaecati id illum architecto temporibus beatae aperiam, laboriosam
                            reiciendis ipsa quam repudiandae odit ex expedita accusantium! Eos?
                        </p>
                    </div>
                </div>
                <div className="content-section">
                    <img
                        src="https://images.unsplash.com/photo-1663511197225-096888e025f4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Tourist Place"
                        className="content-image"
                    />
                    <div className="content-text">
                        <h2 className="content-title">Tourist Places</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ullam quibusdam unde
                            architecto possimus, provident inventore itaque reiciendis at voluptate, nesciunt
                            temporibus laudantium facere. Eum ab aut dolor consequuntur fugiat qui, pariatur
                            perferendis obcaecati id illum architecto temporibus beatae aperiam, laboriosam
                            reiciendis ipsa quam repudiandae odit ex expedita accusantium! Eos?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
