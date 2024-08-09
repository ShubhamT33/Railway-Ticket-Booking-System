package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.BookingDao;
import com.app.dao.SeatDao;
import com.app.dao.TrainDao;
import com.app.dao.TrainStationDao;
import com.app.dao.StationDao;
import com.app.dto.SeatDTO;
import com.app.entity.Booking;
import com.app.entity.BookingSeat;
import com.app.entity.Seat;
import com.app.entity.Train_Station;
import com.app.entity.Trains;
import com.app.entity.Station;

@Service
@Transactional
public class SeatAvailabilityService {

    @Autowired
    private BookingDao bookingDao;
    
    @Autowired
    private TrainDao trainDao;

    @Autowired
    private SeatDao seatDao;

    @Autowired
    private TrainStationDao trainStationDao;

    @Autowired
    private StationDao stationDao;

    @Autowired
    private ModelMapper modelMapper;

    public List<SeatDTO> getAvailableSeats(Trains train, Station fromStation, Station toStation, LocalDate bookingDate) {
        List<Seat> seats = seatDao.findSeatsByTrain(train);
        List<SeatDTO> availableSeats = new ArrayList<>();

        for (Seat seat : seats) {
            if (isSeatAvailable(seat, train, fromStation, toStation, bookingDate)) {
                SeatDTO seatDTO = convertToDTO(seat);
                availableSeats.add(seatDTO);
            }
        }

        return availableSeats;
    }

    private SeatDTO convertToDTO(Seat seat) {
        SeatDTO seatDTO = modelMapper.map(seat, SeatDTO.class);
        seatDTO.setTrain_id(seat.getTrain().getId());
        return seatDTO;
    }

    private boolean isSeatAvailable(Seat seat, Trains train, Station fromStation, Station toStation, LocalDate bookingDate) {
        List<Booking> bookings = bookingDao.findByTrainAndBookingDate(train, bookingDate);

        Train_Station newFrom = getTrainStation(train, fromStation);
        Train_Station newTo = getTrainStation(train, toStation);

        for (Booking booking : bookings) {
            for (BookingSeat bookingSeat : booking.getSeats()) {
                if (bookingSeat.getSeat().equals(seat)) {
                    Train_Station bookingFrom = getTrainStation(train, booking.getFromStation());
                    Train_Station bookingTo = getTrainStation(train, booking.getToStation());

                    if (isRouteConflict(bookingFrom, bookingTo, newFrom, newTo)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    private Train_Station getTrainStation(Trains train, Station station) {
        Optional<Train_Station> trainStation = trainStationDao.findByTrainAndStation(train, station);
        if (trainStation.isPresent()) {
            return trainStation.get();
        } else {
            throw new RuntimeException("Train_Station not found for given train and station");
        }
    }

    private boolean isRouteConflict(Train_Station bookingFrom, Train_Station bookingTo, Train_Station newFrom, Train_Station newTo) {
        return !(newTo.getArrivalTime().isBefore(bookingFrom.getDepartureTime()) || newFrom.getDepartureTime().isAfter(bookingTo.getArrivalTime()));
    }

    public Trains getTrainById(Long trainId) {
        return trainDao.findById(trainId)
                .orElseThrow(() -> new RuntimeException("Train not found"));
    }

    public Station getStationById(Long stationId) {
        return stationDao.findById(stationId)
                .orElseThrow(() -> new RuntimeException("Station not found"));
    }
}
