package com.example.intermove.Entities.SkillsAndQuizz;

import com.example.intermove.Entities.Domain;
import com.example.intermove.Entities.User.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter

@NoArgsConstructor
public class Skills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;

    private String description;
    @Enumerated(EnumType.STRING)
    private Domain domain;

    @OneToOne
    private User user;

    @ManyToOne
    private Quiz quiz;

    public Skills(Integer id, String description, Domain domain, User user, Quiz quiz) {
        this.id = id;
        this.description = description;
        this.domain = domain;
        this.user = user;
        this.quiz = quiz;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Domain getDomain() {
        return domain;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
}
