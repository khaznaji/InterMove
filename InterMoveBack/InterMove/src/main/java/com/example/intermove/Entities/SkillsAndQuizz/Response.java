package com.example.intermove.Entities.SkillsAndQuizz;

import com.example.intermove.Entities.User.User;
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
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ElementCollection
    private List<String> studentResponses;

    private double score;

    @Enumerated(EnumType.STRING)
    private ResponseStatus status;

    @ManyToOne
    @JsonIgnore
    private Question question;

    @ManyToOne
    private User student;

}
