package com.example.intermove.Services.Candidacy;


import com.example.intermove.Entities.CandidatesAndCourses.Courses;
import com.example.intermove.Entities.CandidatesAndCourses.Tags;
import com.example.intermove.Repositories.Candidacy.ICourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServices implements ICourseServices{
    @Autowired
    ICourseRepository courseRepository;

    @Override
    public List<Courses> getcoursetag(String tagName ) {
        System.out.println(tagName);
        return courseRepository.findAllByTagName(tagName);
    }

    @Override
    public Courses addCourse(Courses courses) {
        return courseRepository.save(courses);
    }

    @Override
    public Iterable<Courses> listAllcourses() {
        return courseRepository.findAll();
    }



    @Override
    public Courses getCourseById(Integer id) {
        return courseRepository.findById(id).get();
    }

    @Override
    public Courses updateCourse(Courses courses, Integer idC) {
        Courses course= courseRepository.findById(idC).orElseThrow(() -> new ResourceNotFoundException("Courses", "idC", idC));

        course.setName(courses.getName());

        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Integer id) {
    courseRepository.deleteById(id);
    }

    @Override
    public List<Courses> coursesbytags(Tags tags) {
        return null;//courseRepository.findCoursesByCourseTags(tags);
    }


}
