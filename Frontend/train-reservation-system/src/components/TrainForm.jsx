import React, { useState, useEffect } from 'react';

const TrainForm = ({ trains, setTrains, editingTrain, setEditingTrain, routes }) => {
  const [name, setName] = useState('');
  const [routeId, setRouteId] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (editingTrain) {
      setName(editingTrain.name || '');
      setRouteId(editingTrain.routeId || '');
      setId(editingTrain.id || '');
    }
  }, [editingTrain]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrain = { id, name, routeId };
    if (editingTrain.index != null) {
      const updatedTrains = [...trains];
      updatedTrains[editingTrain.index] = newTrain;
      setTrains(updatedTrains);
    } else {
      setTrains([...trains, newTrain]);
    }
    setEditingTrain(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Train ID:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
      </label>
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
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditingTrain(null)}>Cancel</button>
    </form>
  );
};

export default TrainForm;
