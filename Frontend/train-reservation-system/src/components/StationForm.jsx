import React, { useState, useEffect } from 'react';
import instance from '../JSX/axios';

const StationForm = ({ stations, setStations, editingStation, setEditingStation, routes }) => {
  const [name, setName] = useState('');
  const [route_id, setRoute_Id] = useState('');
  const [sequence, setSequence] = useState('');

  useEffect(() => {
    if (editingStation) {
      setName(editingStation.name || '');
      setRouteId(editingStation.route_id || '');
      setSequence(editingStation.sequence || '');
    }
  }, [editingStation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new station object
    const newStation = { sequence, name, route_id };

    try {
      if (editingStation.index != null) {
        // If editing, update the local state with the new data
        const updatedStations = [...stations];
        updatedStations[editingStation.index] = newStation;
        setStations(updatedStations);
      } else {
        // If adding a new station, call the API to save it to the backend
        const response = await instance.post('/station', newStation); // Adjust the endpoint as per your API

        // Update the local state with the newly created station
        setStations([...stations, response.data]);
      }

      // Reset the editing state
      setEditingStation(null);
    } catch (error) {
      console.error('Error saving station:', error);
      // Handle the error, e.g., show a message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Station Sequence:
        <input type="text" value={sequence} onChange={(e) => setSequence(e.target.value)} required />
      </label>
      <label>
        Station Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Route:
        <select value={route_id} onChange={(e) => setRoute_Id(e.target.value)} required>
          <option value="">Select a route</option>
          {routes.map((route, index) => (
            <option key={index} value={route.id}>{route.name}</option>
          ))}
        </select>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditingStation(null)}>Cancel</button>
    </form>
  );
};
export default StationForm;
