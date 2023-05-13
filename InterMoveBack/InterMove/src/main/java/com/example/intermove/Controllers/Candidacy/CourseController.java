package com.example.intermove.Controllers.Candidacy;

import com.example.intermove.Entities.CandidatesAndCourses.Courses;
import com.example.intermove.Services.Candidacy.ICourseServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    ICourseServices courseServices;

    @PostMapping("/create")
    public ResponseEntity<Courses> addCourse(@RequestBody Courses courses) {
        Courses createdCourses = courseServices.addCourse(courses);
        System.out.println(courses);
        return new ResponseEntity<>(createdCourses, HttpStatus.CREATED);
    }

    @GetMapping("/getbytag/{tagName}")
    public List<Courses> getCoursesByTags(@PathVariable String tagName) {
        System.out.println(tagName);
        return courseServices.getcoursetag(tagName);
    }
    @GetMapping("/")
    public Iterable<Courses> listAllcourses() {
        return courseServices.listAllcourses();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Courses> updateCourse( @RequestBody Courses courses,@PathVariable Integer id) {
        Courses updateCourse = courseServices.updateCourse(courses, id);
        return new ResponseEntity<>(updateCourse, HttpStatus.OK);

    }
    @DeleteMapping("/delete/{id}")
    public void removeOffre1(@PathVariable("id") Integer id) {
        courseServices.deleteCourse(id);
    }

    @GetMapping("/{id}")
    public Courses getCourseById(@PathVariable Integer id) {
        return courseServices.getCourseById(id);
    }
}
