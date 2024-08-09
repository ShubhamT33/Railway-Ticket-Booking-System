package com.app.dto;

import java.time.LocalTime;

import lombok.Data;

@Data
public class TrainResponseDTO {

	  private Long trainId;
	    private String trainName;
	    private String sourceStationName;
	    private String destinationStationName;
	    private LocalTime sourceDepartureTime;
	    private LocalTime destinationArrivalTime;
}
