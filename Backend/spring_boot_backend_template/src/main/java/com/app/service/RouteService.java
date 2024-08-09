package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.RouteDao;
import com.app.dto.RouteDTO;
import com.app.entity.Route;



public interface RouteService {

	Route saveRouteDetails(RouteDTO route);
	
	
}
