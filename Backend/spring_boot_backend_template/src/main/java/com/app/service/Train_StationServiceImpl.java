package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.StationDao;
import com.app.dao.TrainDao;
import com.app.dao.TrainStationDao;
import com.app.dto.Train_StationDTO;
import com.app.entity.Station;
import com.app.entity.Train_Station;
import com.app.entity.Trains;
@Service
@Transactional
public class Train_StationServiceImpl  implements Train_StationService{

	@Autowired
	private TrainDao trainDao;
	
	@Autowired
	private StationDao stationDao;
	
	@Autowired
	private TrainStationDao trainStationDao;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Train_StationDTO addnewTrainStation(Train_StationDTO train_StationDTO) {
		   Trains train = trainDao.findById(train_StationDTO.getTrain_id())
	                .orElseThrow(() -> new RuntimeException("Train not found"));

	        Station station = stationDao.findById(train_StationDTO.getStation_id())
	                .orElseThrow(() -> new RuntimeException("Station not found"));

	        Train_Station train_Station = modelMapper.map(train_StationDTO, Train_Station.class);
	        train_Station.setTrain(train);
	        train_Station.setStation(station);

	        Train_Station train_Station2 = trainStationDao.save(train_Station);
	        
	        Train_StationDTO tsdto = modelMapper.map(train_Station2, Train_StationDTO.class);
	        tsdto.setTrain_id(train_Station.getTrain().getId());
	        tsdto.setStation_id(train_Station.getStation().getId());
	        
	        return tsdto;
	}
	


}
