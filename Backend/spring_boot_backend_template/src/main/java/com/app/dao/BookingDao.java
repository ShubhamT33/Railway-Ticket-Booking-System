package com.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Booking;
import com.app.entity.Seat;
import com.app.entity.Trains;

public interface BookingDao extends JpaRepository<Booking, Long> {
//    List<Booking> findByTrainAndSeatAndBookingDate(Trains train, Seat seat, LocalDate bookingDate);

	List<Booking> findByTrainAndBookingDate(Trains train, LocalDate bookingDate);
}
