package com.example.intermove.Repositories.SkillsAndQuizz;


import com.example.intermove.Entities.SkillsAndQuizz.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Integer> {
}
