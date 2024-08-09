package com.app.dto;

import lombok.Data;

@Data
public class TrainDTO {

	 private String name;
	 
	 private Long route_id;
	 
	 private boolean isForward;
}
