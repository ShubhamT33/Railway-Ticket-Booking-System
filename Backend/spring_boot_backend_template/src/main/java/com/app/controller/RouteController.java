package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.RouteDTO;
import com.app.entity.Route;
import com.app.service.RouteService;

@RestController
@RequestMapping("/route")
@CrossOrigin(origins = "http://localhost:3001")
public class RouteController {
	
	@Autowired
	private RouteService routeService;
	
	@PostMapping
	public ResponseEntity<?> addnewRoute(@RequestBody RouteDTO route){
		
		return ResponseEntity.status(HttpStatus.CREATED).body(routeService.saveRouteDetails(route));
	}

}
