package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entity.Route;

public interface RouteDao  extends JpaRepository<Route, Long>{

	Route save(Route route);

	 @Query("SELECT r FROM Route r JOIN FETCH r.stationList WHERE r.id = :routeId")
	    Optional<Route> findByIdWithStations(@Param("routeId") Long routeId);

}
