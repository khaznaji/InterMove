package com.example.intermove.Repositories.Candidacy;

import com.example.intermove.Entities.CandidatesAndCourses.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
    Document findByCandidacy_IdC(Integer id);
}
