package com.app.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
public class BookingDTO {
	@JsonProperty(access = Access.READ_ONLY)
    private Long id;
	private List<Long> seatIds; 
    private Long trainId;
    private Long fromStationId;
    private Long toStationId;
    private LocalDate bookingDate;
    private Long userId;
}
