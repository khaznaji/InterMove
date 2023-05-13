package com.example.intermove.Entities.Accomodation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;
@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Agency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String name;
    private String country;
    private String region;
    private String adress;
    private String aboutUs;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="agency")
    @JsonIgnore
    public List<Agent> agents;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="agency")
    @JsonIgnore
    public List<House> houses;


}
