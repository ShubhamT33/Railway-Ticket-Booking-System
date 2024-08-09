package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entity.Station;

@Repository
public interface StationDao extends JpaRepository<Station, Long> {

	Station save(Station station);

    @Query("SELECT s FROM Station s WHERE s.route.id = :routeId")
    List<Station> findStationsByRouteId(Long routeId);
    
    Optional<Station> findByName(String name);

}
