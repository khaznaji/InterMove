package com.example.intermove.Entities.CandidatesAndCourses;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Courses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCourse;
    private String Name;
   // private String DomainCourse;
//    @ManyToMany
//    @JsonIgnore

    public Integer getIdCourse() {
        return idCourse;
    }

    public void setIdCourse(Integer idCourse) {
        this.idCourse = idCourse;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }


//    List<Tags> tags;

    @ManyToMany
    @JsonIgnore
    List<Tags> tags;


}