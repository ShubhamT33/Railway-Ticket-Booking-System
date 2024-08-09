package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.SeatDao;
import com.app.dao.TrainDao;
import com.app.dto.SeatDTO;
import com.app.entity.Seat;
import com.app.entity.Trains;

@Service
@Transactional
public class SeatServiceImpl implements SeatService {

	@Autowired
	private SeatDao seatDao;
	
	@Autowired
	private TrainDao trainDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public SeatDTO addnewSeat(SeatDTO seatDTO) {
	 
		  Trains train = trainDao.findById(seatDTO.getTrain_id())
	                .orElseThrow(() -> new RuntimeException("Train not found"));

      Seat seat = modelMapper.map(seatDTO, Seat.class);
      seat.setTrain(train);
      Seat  seat1= seatDao.save(seat);
		 
		 SeatDTO seatDTO1 = modelMapper.map(seat, SeatDTO.class);
		 seatDTO1.setTrain_id(seat.getTrain().getId());
//		 
		 return seatDTO1;
	}

}
