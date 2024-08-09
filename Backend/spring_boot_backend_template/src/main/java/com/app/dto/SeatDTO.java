package com.app.dto;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.app.entity.Trains;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;
@Data
public class SeatDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
    private String seatNumber;
    


   
    private Long train_id;
}
