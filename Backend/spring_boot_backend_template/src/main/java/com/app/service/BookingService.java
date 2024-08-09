package com.app.service;

import java.util.List;

import com.app.dto.BookingDTO;
import com.app.dto.BookingResponseDTO;

public interface BookingService {
	BookingResponseDTO createBooking(BookingDTO bookingDTO);
  
	BookingDTO updateBooking(Long id, BookingDTO bookingDTO);
   
	BookingDTO getBookingById(Long id);
   
	List<BookingResponseDTO> getAllBookings();
  
	void deleteBooking(Long id);
}
