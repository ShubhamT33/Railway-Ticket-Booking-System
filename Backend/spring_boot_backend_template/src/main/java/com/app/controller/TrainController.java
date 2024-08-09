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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.TrainDTO;
import com.app.dto.TrainResponseDTO;
import com.app.entity.Station;
import com.app.entity.Trains;
import com.app.service.TrainService;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/train")
public class TrainController {
	
	@Autowired
	private TrainService trainservice;
	
	@PostMapping
	public ResponseEntity<?> addnewTrain(@RequestBody TrainDTO train){

	return ResponseEntity.status(HttpStatus.CREATED).body(trainservice.saveTrainDetails(train));
	}
	
	
//	  @GetMapping("/route/{routeId}")
//	    public ResponseEntity<List<Station>> getStationsByRouteId(@PathVariable Long routeId) {
//	        List<Station> stations = stationService.getStationsByRouteId(routeId);
//	        return ResponseEntity.ok(stations);
//	    }
	
	@GetMapping("/gettrainsbyrouteid/{routeId}")
	
	public ResponseEntity<List<TrainDTO>>  getTrainsByRouteId(@PathVariable Long routeId){
		List<TrainDTO> trains = trainservice.getTrainsByRouteId(routeId);
		 return ResponseEntity.ok(trains);
	}
	
	   @GetMapping("/api/trains")
	    public ResponseEntity<List<TrainResponseDTO>> getTrains(
	            @RequestParam String source,
	            @RequestParam String destination) {
	        List<TrainResponseDTO> trains = trainservice.findTrains(source, destination);
	        return ResponseEntity.ok(trains);
	    }
}
