package com.example.intermove.Repositories.SkillsAndQuizz;

import com.example.intermove.Entities.SkillsAndQuizz.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseRepository extends JpaRepository<Response,Integer> {
}
