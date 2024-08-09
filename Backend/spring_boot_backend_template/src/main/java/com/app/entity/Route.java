package com.app.entity;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;


@Data
@Entity
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  id;
    
    @Column(nullable = false)
    private String name;
    
    @JsonBackReference
    @OneToMany(mappedBy = "route")
    private List<Station> stationList = new ArrayList<Station>();
}
