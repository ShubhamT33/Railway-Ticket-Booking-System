package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Station;
import com.app.entity.Train_Station;
import com.app.entity.Trains;

public interface TrainStationDao extends JpaRepository<Train_Station, Long>{
	 Optional<Train_Station> findByTrainAndStation(Trains train, Station station);
}
