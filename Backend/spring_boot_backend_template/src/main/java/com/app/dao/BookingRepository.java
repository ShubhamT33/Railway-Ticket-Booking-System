package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
