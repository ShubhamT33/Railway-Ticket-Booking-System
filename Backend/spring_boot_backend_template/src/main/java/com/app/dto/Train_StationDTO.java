package com.app.dto;

import java.time.LocalTime;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entity.Station;
import com.app.entity.Trains;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
@Data
public class Train_StationDTO {
    
 
    private Long train_id;
    
    
    private Long station_id;
    
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @Schema(description = "Arrival time in the format HH:mm", example = "09:00")
    private LocalTime arrivalTime;
    
    
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @Schema(description = "Departure time in the format HH:mm", example = "10:00")
    private LocalTime departureTime;

}
