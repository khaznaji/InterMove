package com.example.intermove.Repositories.SkillsAndQuizz;

import com.example.intermove.Entities.Domain;
import com.example.intermove.Entities.SkillsAndQuizz.Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SkillsRepository extends JpaRepository<Skills,Integer> {
    @Query("SELECT s.id AS skill_id, s.description, s.domain, u.lastname AS user_name, q.nom AS quiz_name FROM Skills s JOIN s.user u JOIN s.quiz q")
    List<Object[]> findSkillsWithUserAndQuizzNames();

    @Query("SELECT o FROM Skills o WHERE o.description LIKE CONCAT('%',:s,'%')")
    public List<Skills> searchSkills(@Param("s") String s);
    List<Skills> findByDomain(Domain domain);

}
