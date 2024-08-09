package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.RouteDao;
import com.app.dao.StationDao;
import com.app.dto.StationDTO;
import com.app.entity.Route;
import com.app.entity.Station;

@Service
@Transactional
public class StationServiceImpl implements StationService {

	@Autowired
	private StationDao stationDao;
	
	
	
	@Autowired
	private RouteDao routedao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public Station saveStationDetails(StationDTO station) {
		
		 
		  Route route = routedao.findById(station.getRoute_id())
		            .orElseThrow(() -> new RuntimeException("Route not found"));
		
		Station station1 = modelMapper.map(station, Station.class);
	station1.setRoute(route);
		// TODO Auto-generated method stub
		return stationDao.save(station1);
	}
	
	 
	@Override
	 public List<Station> getStationsByRouteId(Long routeId) {
		Route route = routedao.findByIdWithStations(routeId)
		        .orElseThrow(() -> new RuntimeException("Route not found"));
//		route.getStationList().size();
		return route.getStationList();
	}


	@Override
	public List<Station> getAllStations() {
		// TODO Auto-generated method stub
		return stationDao.findAll();
	}	
	
	   public Station getStationById(Long stationId) {
	        return stationDao.findById(stationId).orElseThrow(() -> new RuntimeException("Station not found"));
	    }


	@Override
	public Station findById(Long fromStationId) {
		// TODO Auto-generated method stub
		return stationDao.findById(fromStationId).orElseThrow(() -> new RuntimeException("Station not found"));
	}
	

}
