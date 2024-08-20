import React, { useState, useEffect } from 'react';

const TrainStationForm = ({ trainStations, setTrainStations, editingTrainStation, setEditingTrainStation, stations, trains }) => {
  const [name, setName] = useState('');
  const [stationId, setStationId] = useState('');
  const [trainId, setTrainId] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (editingTrainStation) {
      setName(editingTrainStation.name || '');
      setStationId(editingTrainStation.stationId || '');
      setTrainId(editingTrainStation.trainId || '');
      setId(editingTrainStation.id || '');
    }
  }, [editingTrainStation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrainStation = { id, name, stationId, trainId };
    if (editingTrainStation.index != null) {
      const updatedTrainStations = [...trainStations];
      updatedTrainStations[editingTrainStation.index] = newTrainStation;
      setTrainStations(updatedTrainStations);
    } else {
      setTrainStations([...trainStations, newTrainStation]);
    }
    setEditingTrainStation(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Train Station ID:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
      </label>
      <label>
        Train Station Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Station:
        <select value={stationId} onChange={(e) => setStationId(e.target.value)} required>
          <option value="">Select a station</option>
          {stations.map((station, index) => (
            <option key={index} value={station.id}>{station.name}</option>
          ))}
        </select>
      </label>
      <label>
        Train:
        <select value={trainId} onChange={(e) => setTrainId(e.target.value)} required>
          <option value="">Select a train</option>
          {trains.map((train, index) => (
            <option key={index} value={train.id}>{train.name}</option>
          ))}
        </select>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditingTrainStation(null)}>Cancel</button>
    </form>
  );
};

export default TrainStationForm;
