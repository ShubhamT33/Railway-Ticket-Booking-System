package com.app.service;

import java.util.List;

import com.app.dto.TrainDTO;
import com.app.dto.TrainResponseDTO;
import com.app.entity.Station;
import com.app.entity.Trains;

public interface TrainService {
	
	TrainDTO  saveTrainDetails ( TrainDTO train);
	
	List<TrainDTO> getTrainsByRouteId(Long routeId);
	
	Trains ssgetTrainById(Long trainId);

	Trains findById(Long trainId);
	
	List<TrainResponseDTO> findTrains(String sourceName, String destinationName);

}
