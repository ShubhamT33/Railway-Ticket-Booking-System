import React, { useEffect } from 'react';
import instance from '../JSX/axios';

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
    // await instance.delete(`/route/${index+1}`);
    setRoutes(routes.filter((_, i) => i !== index));
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

export default RouteList;
