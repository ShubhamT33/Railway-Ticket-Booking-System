package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.SeatDTO;
import com.app.entity.Seat;
import com.app.service.SeatService;
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/seat")
public class SeatController {

	@Autowired
	private SeatService  seatService;
	
	@PostMapping
	ResponseEntity<?> addnewSeatforaTrain(@RequestBody SeatDTO seatDTO){
		 SeatDTO createdSeatDTO = seatService.addnewSeat(seatDTO);
	        return ResponseEntity.status(HttpStatus.CREATED).body(createdSeatDTO);}
	
	
	
	
	
}
