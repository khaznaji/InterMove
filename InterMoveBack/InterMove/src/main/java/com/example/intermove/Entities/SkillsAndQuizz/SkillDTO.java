package com.example.intermove.Entities.SkillsAndQuizz;

import com.example.intermove.Entities.Domain;

public class SkillDTO {
  private int id;
  private String description;
  private Domain domain;
  private String user;
  private String quiz;

  public int getId() {
    return id;
  }

  public void setId(int id) {
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

  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public String getQuiz() {
    return quiz;
  }

  public void setQuiz(String quiz) {
    this.quiz = quiz;
  }


  // constructeurs, getters et setters
}