package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.RouteDao;
import com.app.dao.StationDao;
import com.app.dao.TrainDao;
import com.app.dto.TrainDTO;
import com.app.dto.TrainResponseDTO;
import com.app.entity.Route;
import com.app.entity.Station;
import com.app.entity.Trains;

@Service
@Transactional
public class TrainServiceImpl implements TrainService {
	
	@Autowired
	private TrainDao trainDao;
	
	@Autowired
	private StationDao stationDao;
	
	@Autowired
	private RouteDao routeDao;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public TrainDTO saveTrainDetails(TrainDTO train) {
		// TODO Auto-generated method stub
		
		Route route = routeDao.findById(train.getRoute_id())
	            .orElseThrow(() -> new RuntimeException("Route not found"));
	
		Trains train1 = modelMapper.map(train,Trains.class);
		train1.setRoute(route);
		Trains newtrain = trainDao.save(train1);
		
		TrainDTO newtrainDTO = modelMapper.map(newtrain,TrainDTO.class);
		
		newtrainDTO.setRoute_id(route.getId());
		return newtrainDTO;
	}

	@Override
	
	public List<TrainDTO> getTrainsByRouteId(Long routeId) {
		
		List<Trains> trains = trainDao.findByRouteId(routeId);
		   return trains.stream().map(train -> {
	            TrainDTO trainDTO = modelMapper.map(train, TrainDTO.class);
	            trainDTO.setRoute_id(train.getRoute().getId());
	            return trainDTO;
	        }).collect(Collectors.toList());
	
	}

	
//	 public Trains getTrainById(Long trainId) {
//	        return trainDao.findById(trainId).orElseThrow(() -> new RuntimeException("Train not found"));
//	    }
//
//	    public List<Trains> findTrains(String sourceName, String destinationName) {
//	        // Fetch stations by name
//	        Station sourceStation = stationDao.findByName(sourceName) .orElseThrow(() -> new RuntimeException("Source station not found"));
////	              System.out.println(sourceStation.getName());
//	        Station destinationStation = stationDao.findByName(destinationName) .orElseThrow(() -> new RuntimeException("Destination station not found"));
//	                
//
//	        // Determine if the route is forward or backward
//	        boolean isForward = sourceStation.getSequence() < destinationStation.getSequence();
//
//	        // Fetch trains based on the route and direction
//	        List<Trains> trains = trainDao.findByRouteAndDirection(
//	                sourceStation.getRoute().getId(),
//	                isForward,
//	                sourceStation.getSequence(),
//	                destinationStation.getSequence()
//	        );
//
//	        return trains;
//	    }

    public List<TrainResponseDTO> findTrains(String sourceName, String destinationName) {
        Optional<Station> sourceStationOpt = stationDao.findByName(sourceName);
        Optional<Station> destinationStationOpt = stationDao.findByName(destinationName);

        if (!sourceStationOpt.isPresent()) {
            throw new RuntimeException("Source station not found");
        }

        if (!destinationStationOpt.isPresent()) {
            throw new RuntimeException("Destination station not found");
        }

        Station sourceStation = sourceStationOpt.get();
        Station destinationStation = destinationStationOpt.get();

        boolean isForward = sourceStation.getSequence() < destinationStation.getSequence();

        List<Trains> trains = trainDao.findByRouteAndIsForward(sourceStation.getRoute().getId(), isForward);

        return trains.stream().map(train -> {
            TrainResponseDTO dto = new TrainResponseDTO();
            dto.setTrainId(train.getId());
            dto.setTrainName(train.getName());
            dto.setSourceStationName(sourceStation.getName());
            dto.setDestinationStationName(destinationStation.getName());
            // Set forward flag

            // You may fetch train station details here if needed
//            train.getTrainStations().forEach(ts -> {
//                if (ts.getStation().getId().equals(sourceStation.getId())) {
//                    dto.setSourceDepartureTime(ts.getDepartureTime());
//                }
//                if (ts.getStation().getId().equals(destinationStation.getId())) {
//                    dto.setDestinationArrivalTime(ts.getArrivalTime());
//                }
//            });

            return dto;
        }).collect(Collectors.toList());
    }
@Override
public Trains ssgetTrainById(Long trainId) {
	// TODO Auto-generated method stub
	Trains t1 = trainDao.getById(trainId);
	return t1;
}

@Override
public Trains findById(Long trainId) {
	// TODO Auto-generated method stub
	
	return null;
}
}
