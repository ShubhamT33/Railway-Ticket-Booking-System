package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
public class RouteDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	private String name;
}
