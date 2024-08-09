package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
public class StationDTO {
	
	private String name;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private Long route_id;

}
