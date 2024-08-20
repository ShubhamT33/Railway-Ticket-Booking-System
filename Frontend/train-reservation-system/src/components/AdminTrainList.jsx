import React from 'react';

const AdminTrainList = ({ trains, setEditingTrain, setTrains }) => {
  const deleteTrain = (index) => {
    setTrains(trains.filter((_, i) => i !== index));
  };

  return (
    <div>
      {trains.map((train, index) => (
        <div key={index} className="item">
          <p>ID: {train.id}, Name: {train.name}</p>
          <div>
            <button onClick={() => setEditingTrain({ index, ...train })}>Edit</button>
            <button onClick={() => deleteTrain(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminTrainList;
