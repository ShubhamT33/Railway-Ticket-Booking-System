package com.app.service;

import java.util.List;

import com.app.dto.StationDTO;
import com.app.entity.Station;
import com.app.entity.Trains;

public interface StationService {
	
	Station saveStationDetails(StationDTO station);
	
	List<Station> getStationsByRouteId(Long routeId);
    
	List<Station> getAllStations();
	
	Station getStationById(Long stationId);

	Station findById(Long fromStationId);
}
