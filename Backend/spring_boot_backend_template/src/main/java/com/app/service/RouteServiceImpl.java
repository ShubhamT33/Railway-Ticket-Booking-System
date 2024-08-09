package com.app.service;
import org.modelmapper.ModelMapper;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.RouteDao;
import com.app.dto.RouteDTO;
import com.app.entity.Route;

@Service
@Transactional
public class RouteServiceImpl implements RouteService {
	
	@Autowired
	private RouteDao routeDao;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Route saveRouteDetails(RouteDTO route) {
		// TODO Auto-generated method stub
		Route route1 = modelMapper.map(route,Route.class);
		return routeDao.save(route1);
	}
	

}
