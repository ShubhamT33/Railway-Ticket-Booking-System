package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.TrainDTO;
import com.app.dto.Train_StationDTO;
import com.app.service.Train_StationService;
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/train_StationController")
public class Train_StationController {
	
	@Autowired
	private Train_StationService train_StationService;
	
	@PostMapping
	public ResponseEntity<?> addnewTrain_Station(@RequestBody Train_StationDTO train_stationDto){

	return ResponseEntity.status(HttpStatus.CREATED).body(train_StationService.addnewTrainStation(train_stationDto));
	}

}
