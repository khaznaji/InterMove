package com.example.intermove.Entities.CandidatesAndCourses;

import javax.persistence.*;



public class CourseTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCT;

    @ManyToOne
    @JoinColumn(name = "idCourse")
    Courses cources;
    @ManyToOne
    @JoinColumn(name = "idTag")
    Tags tags;


}
