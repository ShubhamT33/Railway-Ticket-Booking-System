package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.dto.TrainDTO;
import com.app.entity.Trains;


public interface TrainDao extends JpaRepository<Trains, Long> {

	List<Trains> findByRouteId(Long routeId);

	
//	 @Query("SELECT t FROM Trains t JOIN t.trainStations ts WHERE ts.station.route.id = :routeId AND " +
//	            "((:isForward = true AND ts.station.sequence >= :sourceSeq AND ts.station.sequence <= :destSeq) OR " +
//	            "(:isForward = false AND ts.station.sequence <= :sourceSeq AND ts.station.sequence >= :destSeq))")
//	    List<Trains> findByRouteAndDirection(@Param("routeId") Long routeId,
//	                                         @Param("isForward") boolean isForward,
//	                                         @Param("sourceSeq") int sourceSeq,
//	                                         @Param("destSeq") int destSeq);
	 

    @Query("SELECT t FROM Trains t WHERE t.route.id = :routeId AND t.isForward = :isForward")
    List<Trains> findByRouteAndIsForward(@Param("routeId") Long routeId, @Param("isForward") boolean isForward);
    
    
    Trains getById(Long id);
	
}
