import React from 'react';
const StationList = ({ stations, setEditingStation, setStations, routes, setRoutes }) => {
  // Ensure stations is always an array
  if (!Array.isArray(stations)) {
      return <p>No stations available.</p>;
  }

  return (
      <ul>
          {stations.map((station, index) => (
              <li key={index}>
                  {station.name}
                  <button onClick={() => setEditingStation({ ...station, index })}>
                      Edit
                  </button>
                  {/* Add delete or other actions as needed */}
              </li>
          ))}
      </ul>
  );
};

export default StationList;

