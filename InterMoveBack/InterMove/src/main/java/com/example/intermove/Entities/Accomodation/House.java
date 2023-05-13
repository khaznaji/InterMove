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
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String title;
    @Enumerated(EnumType.STRING)
    private TypeHouses type_houses;
    private String country;
    private String region;
    private String adress;
    private Integer Loyer;
    private Boolean available;
    private Integer nbrOfRooms;
    private String agencyName;
    private String description;

    @ManyToOne
    @JsonIgnore
    public Agency agency;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="house")
    @JsonIgnore
    public List<Image> images;

}
