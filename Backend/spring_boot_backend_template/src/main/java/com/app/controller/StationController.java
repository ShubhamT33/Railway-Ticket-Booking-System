package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.StationDTO;
import com.app.entity.Station;
import com.app.service.StationService;

@RestController
@RequestMapping("/station")
@CrossOrigin(origins = "http://localhost:3001")
public class StationController {
	
	
	@Autowired
	private StationService stationService;
	
	@PostMapping
	public ResponseEntity<?> addnewStation(@RequestBody StationDTO station){
		
		return ResponseEntity.status(HttpStatus.CREATED).body(stationService.saveStationDetails(station));
	}
	
	  @GetMapping("/route/{routeId}")
	    public ResponseEntity<List<Station>> getStationsByRouteId(@PathVariable Long routeId) {
	        List<Station> stations = stationService.getStationsByRouteId(routeId);
	        return ResponseEntity.ok(stations);
	    }
	  
	  @GetMapping("/allstations")
	  public ResponseEntity<?> listStations(){
		  List<Station> list  = stationService.getAllStations();
		  if (list.isEmpty())
				return ResponseEntity.noContent().build();
			return ResponseEntity.ok(list);
	  }

}

