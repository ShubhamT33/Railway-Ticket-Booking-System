//=====================================================================================================================================
// RouteForm.jsx
import React, { useState, useEffect } from 'react';
import instance from '../JSX/axios';

const RouteForm = ({ routes, setRoutes, editingRoute, setEditingRoute }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (editingRoute) {
      setName(editingRoute.name || '');
      setId(editingRoute.id || '');
    }
  }, [editingRoute]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRoute = { id, name };

    try {
      const response = await instance.post('route', newRoute); // Adjust the endpoint as per your API
      const savedRoute = response.data;

      if (editingRoute.index != null) {
        const updatedRoutes = [...routes];
        updatedRoutes[editingRoute.index] = savedRoute;
        setRoutes(updatedRoutes);
      } else {
        setRoutes([...routes, savedRoute]);
      }
      setEditingRoute(null);
    } catch (error) {
      console.error('Error saving route:', error);
      // Handle the error, e.g., show a message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Route ID:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
      </label>
      <label>
        Route Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditingRoute(null)}>Cancel</button>
    </form>
  );
};

//=====================================================================================================================================
// RouteList.jsx

const RouteList = ({ routes, setRoutes, setEditingRoute }) => {

  useEffect(() => {
    // Fetch routes from the API when the component mounts
    const fetchRoutes = async () => {
      try {
        const response = await instance.get('/route'); // Adjust the endpoint as per your API
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
        // Handle the error, e.g., show a message to the user
      }
    };

    fetchRoutes();
  }, [setRoutes]);

  const deleteRoute = async (index) => {
    // const response = await instance.delete(`/route/${index}`);
    // if (response.status === 200) {
    setRoutes(routes.filter((_, i) => i !== index));
    // }
  };

  return (
    <div>
      {routes.map((route, index) => (
        <div key={index} className="item">
          <p>{route.name}</p>
          <div>
            <button onClick={() => setEditingRoute({ index, ...route })}>Edit</button>
            <button onClick={() => deleteRoute(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

//=====================================================================================================================================
// StationForm.jsx

const StationForm = ({ stations, setStations, editingStation, setEditingStation, routes }) => {
  const [name, setName] = useState('');
  const [route_id, setRoute_Id] = useState('');
  const [sequence, setSequence] = useState('');

  useEffect(() => {
    if (editingStation) {
      setName(editingStation.name || '');
      setRoute_Id(editingStation.route_id || '');
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

//=====================================================================================================================================
// StationList.jsx

const StationList = ({ stations, setEditingStation, setStations }) => {
  useEffect(() => {
    // Fetch stations from the API when the component mounts
    const fetchStations = async () => {
      try {
        const response = await instance.get('/station/allstations'); // Adjust the endpoint as per your API
        setStations(response.data);
      } catch (error) {
        console.error('Error fetching stations:', error);
        // Handle the error, e.g., show a message to the user
      }
    };

    fetchStations();
  }, [setStations]);

  const deleteStation = (index) => {
    setStations(stations.filter((_, i) => i !== index));
  };

  return (
    <div>
      {stations.map((station, index) => (
        <div key={index} className="item">
          <p>ID: {station.id}, Name: {station.name} </p>
          <div>
            <button onClick={() => setEditingStation({ index, ...station })}>Edit</button>
            <button onClick={() => deleteStation(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

//=====================================================================================================================================
// TrainForm.jsx


const TrainForm = ({ trains, setTrains, editingTrain, setEditingTrain, routes }) => {
  const [name, setName] = useState('');
  const [routeId, setRouteId] = useState('');
  const [isForward, setIsForward] = useState('');

  useEffect(() => {
    if (editingTrain) {
      setName(editingTrain.name || '');
      setRouteId(editingTrain.routeId || '');
      setIsForward(editingTrain.isForward || '');
    }
  }, [editingTrain]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTrain = { name, routeId, isForward: isForward === 'true' };

    try {
      // Add a new train in the backend
      const response = await instance.post('/api/trains', newTrain);
      setTrains([...trains, response.data]); // Assuming the backend returns the created train
      setEditingTrain(null);
    } catch (error) {
      console.error('Error saving train:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Train Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Route:
        <select value={routeId} onChange={(e) => setRouteId(e.target.value)} required>
          <option value="">Select a route</option>
          {routes.map((route, index) => (
            <option key={index} value={route.id}>{route.name}</option>
          ))}
        </select>
      </label>
      <label>
        Is Forward:
        <select value={isForward} onChange={(e) => setIsForward(e.target.value)} required>
          <option value="">Select direction</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditingTrain(null)}>Cancel</button>
    </form>
  );
};

//=====================================================================================================================================
// TrainList.jsx

const AdminTrainList = ({ setEditingTrain }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch all trains from the API when the component mounts
    const fetchTrains = async () => {
      try {
        const response = await instance.get('/train');
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
        // Handle the error, e.g., show a message to the user
      }
    };

    fetchTrains();
  }, []);

  const deleteTrain = (index) => {
    setTrains(trains.filter((_, i) => i !== index));
  };

  return (
    <div>
      {trains.map((train, index) => (
        <div key={index} className="item">
          <p>Route ID: {train.route_id}, Name: {train.name}</p>
          <div>
            <button onClick={() => setEditingTrain({ index, ...train })}>Edit</button>
            <button onClick={() => deleteTrain(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

//=====================================================================================================================================
// TrainStationForm.jsx


const TrainStationForm = ({ trainStations, setTrainStations, editingTrainStation, setEditingTrainStation, stations, trains }) => {
  const [stationId, setStationId] = useState('');
  const [trainId, setTrainId] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');

  useEffect(() => {
    if (editingTrainStation) {
      setStationId(editingTrainStation.stationId || '');
      setTrainId(editingTrainStation.trainId || '');
      setArrivalTime(editingTrainStation.arrivalTime || '');
      setDepartureTime(editingTrainStation.departureTime || '');
    }
  }, [editingTrainStation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTrainStation = { station_id: stationId, train_id: trainId, arrivalTime, departureTime };

    try {
      const response = await instance.post('/api/trainstation/add', newTrainStation);

      if (editingTrainStation?.index != null) {
        const updatedTrainStations = [...trainStations];
        updatedTrainStations[editingTrainStation.index] = response.data;
        setTrainStations(updatedTrainStations);
      } else {
        setTrainStations([...trainStations, response.data]);
      }
      setEditingTrainStation(null);
    } catch (error) {
      console.error('Error adding/updating train station:', error);
      // Handle the error (e.g., show a message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <label>
        Arrival Time:
        <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required />
      </label>
      <label>
        Departure Time:
        <input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditingTrainStation(null)}>Cancel</button>
    </form>
  );
};

//=====================================================================================================================================
// TrainStationList.jsx

const TrainStationList = ({ trainStations, setEditingTrainStation, setTrainStations, stations }) => {

  useEffect(() => {
    const fetchTrainStations = async () => {
      try {
        const response = await instance.get('/train_StationController'); // Adjust the endpoint URL if needed
        setTrainStations(response.data);
      } catch (error) {
        console.error('Error fetching train stations:', error);
      }
    };

    fetchTrainStations();
  }, [setTrainStations]);

  const deleteTrainStation = (index) => {
    setTrainStations(trainStations.filter((_, i) => i !== index));
  };

  return (
    <div>
      {trainStations.map((trainStation, index) => (
        <div key={index} className="item">
          <p>Train ID: {trainStation.train_id}, Station ID: {trainStation.station_id}</p>
          <div>
            <button onClick={() => setEditingTrainStation({ index, ...trainStation })}>Edit</button>
            <button onClick={() => deleteTrainStation(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { TrainStationList, RouteForm, TrainStationForm, AdminTrainList, TrainForm, StationList, StationForm, RouteList };

