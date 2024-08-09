package com.app.dto;

import com.app.entity.Role;

import lombok.Data;
@Data
public class UserDTO {

	 private String firstName;
	    private String lastName;
	    private String email;
	    private String password;
	    private Role role;
}
