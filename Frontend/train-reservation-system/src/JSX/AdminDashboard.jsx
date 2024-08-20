import { useState } from 'react';
import {
    RouteList,
    RouteForm,
    StationList,
    StationForm,
    TrainStationList,
    TrainStationForm,
    AdminTrainList,
    TrainForm
} from '../components/CombinedComponents';
import '../styles.css';

const AdminDashboard = () => {
    const [routes, setRoutes] = useState([]);
    const [stations, setStations] = useState([]);
    const [trainStations, setTrainStations] = useState([]);
    const [trains, setTrains] = useState([]);

    const [editingRoute, setEditingRoute] = useState(null);
    const [editingStation, setEditingStation] = useState(null);
    const [editingTrainStation, setEditingTrainStation] = useState(null);
    const [editingTrain, setEditingTrain] = useState(null);
    return (
        <div>
            <section>
                <h2>Manage Routes</h2>
                <button onClick={() => setEditingRoute({})}>Add New Route</button>
                <RouteList routes={routes} setEditingRoute={setEditingRoute} setRoutes={setRoutes} />
                {editingRoute && (
                    <RouteForm
                        routes={routes}
                        setRoutes={setRoutes}
                        editingRoute={editingRoute}
                        setEditingRoute={setEditingRoute}
                    />
                )}
            </section>

            <section>
                <h2>Manage Stations</h2>
                {/* <button onClick={() => setEditingStation({})}>Add New Station</button>
                <StationList
                    stations={stations}
                    setEditingStation={setEditingStation}
                    setStations={setStations}
                    routes={routes}
                    setRoutes={setRoutes}
                />
                {editingStation && (
                    <StationForm
                        stations={stations}
                        setStations={setStations}
                        editingStation={editingStation}
                        setEditingStation={setEditingStation}
                        routes={routes}
                    />
                )} */}
            </section>

            <section>
                <h2>Manage Train Stations</h2>
                <button onClick={() => setEditingTrainStation({})}>Add New Train Station</button>
                <TrainStationList
                    trainStations={trainStations}
                    setEditingTrainStation={setEditingTrainStation}
                    setTrainStations={setTrainStations}
                    stations={stations}
                />
                {editingTrainStation && (
                    <TrainStationForm
                        trainStations={trainStations}
                        setTrainStations={setTrainStations}
                        editingTrainStation={editingTrainStation}
                        setEditingTrainStation={setEditingTrainStation}
                        stations={stations}
                        trains={trains}
                    />
                )}
            </section>

            <section>
                <h2>Manage Trains</h2>
                <button onClick={() => setEditingTrain({})}>Add New Train</button>
                <AdminTrainList
                    trains={trains}
                    setEditingTrain={setEditingTrain}
                    setTrains={setTrains}
                />
                {editingTrain && (
                    <TrainForm
                        trains={trains}
                        setTrains={setTrains}
                        editingTrain={editingTrain}
                        setEditingTrain={setEditingTrain}
                        routes={routes}
                    />
                )}
            </section>
        </div>
    )
}

export default AdminDashboard;