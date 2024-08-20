import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS/TrainList.css';
import instance from './axios';

const TrainList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingDate, setBookingDate] = useState('');
    const { trains } = location.state || { trains: [] };

    const handleBookingClick = async (train) => {
        try {
            const trainId = train.trainId;
            const fromStationName = train.sourceStationName;
            const toStationName = train.destinationStationName;
            const response = await instance.get('/availability/seats', {
                params: { trainId, fromStationName, toStationName, bookingDate }
            });

            const availableSeats = response.data;

            // Navigate to the Booking page with availableSeats and other details
            navigate(`/booking/${train.trainId}`, {
                state: {
                    availableSeats,
                    trainId: train.trainId,
                    fromStationName,
                    toStationName,
                    bookingDate // Ensure this value is properly set
                }
            });
        } catch (error) {
            console.error('Error fetching available seats:', error);
        }
    };

    return (
        <div className="train-list-container">
            <div className="background-image"></div>
            <h1>Train List</h1>
            <div className="booking-form">
                <div className="form-group">
                    <label htmlFor="bookingDate">Booking Date</label>
                    <input
                        className='form-control'
                        type="date"
                        id="bookingDate"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="train-list">
                {trains.length > 0 ? (
                    trains.map((train) => (
                        <div key={train.trainId} className="train-card">
                            <h2>{train.trainName}</h2>
                            <table className="train-table">
                                <thead>
                                    <tr>
                                        <th>Source</th>
                                        <th>Destination</th>
                                        <th>Departure</th>
                                        <th>Arrival</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{train.sourceStationName}</td>
                                        <td>{train.destinationStationName}</td>
                                        <td>{train.sourceDepartureTime || 'N/A'}</td>
                                        <td>{train.destinationArrivalTime || 'N/A'}</td>
                                        <td><button onClick={() => handleBookingClick(train)}>Book Seats</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <p>No trains found for the selected route.</p>
                )}
            </div>
        </div>
    );
}

export default TrainList;
