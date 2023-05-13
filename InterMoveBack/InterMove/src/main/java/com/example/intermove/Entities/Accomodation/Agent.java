package com.example.intermove.Entities.Accomodation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Agent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String name;
    private Long number;
    private String agencyName;
    private String email;
    private String description;

    @ManyToOne
    @JsonIgnore
    public Agency agency;


}
