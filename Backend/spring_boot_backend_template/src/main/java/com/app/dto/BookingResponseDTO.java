package com.app.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;
@Data
public class BookingResponseDTO {

	
	 private Long bookingId;
	    private Long trainId;
	    private String trainName;
	    private String sourceStationName;
	    private String destinationStationName;
	    private List<Long> seatIds;
	    private List<String> seatNumbers;
	    private LocalDate bookingDate;
	    private String userName;
	    private double price;
	
}
