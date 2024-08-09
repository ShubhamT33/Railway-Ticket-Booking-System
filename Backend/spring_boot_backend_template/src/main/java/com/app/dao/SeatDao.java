package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entity.Seat;
import com.app.entity.Trains;

@Repository
public interface SeatDao extends JpaRepository<Seat, Long> {
  
	  @Query("SELECT s FROM Seat s WHERE s.train = :train")
	    List<Seat> findSeatsByTrain(@Param("train") Trains train);
    
    
}
