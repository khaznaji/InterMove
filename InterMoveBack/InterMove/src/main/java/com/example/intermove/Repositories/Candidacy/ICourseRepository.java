package com.example.intermove.Repositories.Candidacy;

import com.example.intermove.Entities.CandidatesAndCourses.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICourseRepository extends JpaRepository<Courses, Integer> {
    //Iterable<Courses> findALLByDomainCourse(String domainCourse);


//List<Courses> findCoursesByCourseTags(Tags tags);

  //  @Query("SELECT c FROM Courses c JOIN c.tags ct JOIN ct.idTags t WHERE  = :tagName")
    //List<Courses> findAllByTagsAndTags(String tagName);

    @Query("SELECT c FROM Courses c JOIN c.tags t WHERE t.NameTag = :nameTag")
    List<Courses> findAllByTagName(String nameTag);

    }
