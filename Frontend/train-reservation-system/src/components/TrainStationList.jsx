import React from 'react';

const TrainStationList = ({ trainStations, setEditingTrainStation, setTrainStations, stations }) => {
  const deleteTrainStation = (index) => {
    setTrainStations(trainStations.filter((_, i) => i !== index));
  };

  return (
    <div>
      {trainStations.map((trainStation, index) => (
        <div key={index} className="item">
          <p>ID: {trainStation.id}, Name: {trainStation.name} (Station: {stations.find(station => station.id === trainStation.stationId)?.name})</p>
          <div>
            <button onClick={() => setEditingTrainStation({ index, ...trainStation })}>Edit</button>
            <button onClick={() => deleteTrainStation(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainStationList;
