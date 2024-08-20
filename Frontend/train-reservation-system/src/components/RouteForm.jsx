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
      const response = await instance.post('route/api/routes', newRoute); // Adjust the endpoint as per your API
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

export default RouteForm;
