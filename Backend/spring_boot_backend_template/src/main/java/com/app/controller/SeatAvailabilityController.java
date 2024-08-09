package com.app.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.TrainDao;
import com.app.dto.SeatDTO;
import com.app.entity.Station;
import com.app.entity.Trains;
import com.app.service.StationService;
import com.app.service.TrainService;

import com.app.service.SeatAvailabilityService;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@Transactional
public class SeatAvailabilityController {

    @Autowired
    private SeatAvailabilityService seatAvailabilityService;

    @Autowired
    private TrainService trainService;

    @Autowired
    private StationService stationService;
    
    @Autowired
    private TrainDao traindao;

    @GetMapping("/availability/seats")
    public List<SeatDTO> getAvailableSeats(@RequestParam Long trainId, @RequestParam Long fromStationId, @RequestParam Long toStationId, @RequestParam String bookingDate) {
        Trains train = trainService.ssgetTrainById(trainId);
        Station fromStation = stationService.findById(fromStationId);
        Station toStation = stationService.findById(toStationId);
        LocalDate date = LocalDate.parse(bookingDate);

        return seatAvailabilityService.getAvailableSeats(train, fromStation, toStation, date);
    }
}
