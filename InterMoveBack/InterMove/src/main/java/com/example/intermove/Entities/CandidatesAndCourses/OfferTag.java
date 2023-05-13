package com.example.intermove.Entities.CandidatesAndCourses;

import lombok.*;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
//@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class OfferTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idO;
    private Integer idT;




}
