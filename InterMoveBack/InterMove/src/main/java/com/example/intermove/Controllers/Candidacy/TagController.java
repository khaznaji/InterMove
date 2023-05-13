package com.example.intermove.Controllers.Candidacy;

import com.example.intermove.Entities.CandidatesAndCourses.Courses;
import com.example.intermove.Entities.CandidatesAndCourses.Tags;
import com.example.intermove.Entities.Offer.Offer;
import com.example.intermove.Repositories.Candidacy.ICourseRepository;
import com.example.intermove.Repositories.Candidacy.ITagReporsitory;
import com.example.intermove.Services.Candidacy.ITagServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tag")
public class TagController {
    @Autowired
    ITagServices tagServices;

    @Autowired
    private ICourseRepository courseRepository;

    @Autowired
    private ITagReporsitory tagRepository;

    @PostMapping("/create")
    public ResponseEntity<Tags> createCandidacy(@RequestBody Tags tags) {
        // candidacy.setUser(new User(1));
        Tags createdCandidacy = tagServices.createTag(tags);
        System.out.println(tags);
        return new ResponseEntity<>(tags, HttpStatus.CREATED);
    }



    @PostMapping("/offers/{offerId}/tags")
    public ResponseEntity<?> assignTagsToOffer(@PathVariable Integer offerId, @RequestBody List<Integer> tagIds) {
        Offer offer = tagServices.assignTagsToOffer(offerId, tagIds);
        return ResponseEntity.ok().body(offer);
    }

    @PostMapping("/courses/{courseId}/tags")
    public ResponseEntity<?> assignTagsToCourse(@PathVariable Integer courseId, @RequestBody List<Integer> tagIds) {
        Courses course = tagServices.assignTagsToCourse(courseId, tagIds);
        return ResponseEntity.ok().body(course);
    }
    @GetMapping
    public List<Tags> getAllTags() {
        return tagServices.getAllTags();
    }

    @GetMapping("/{id}")
    public Tags getTagById(@PathVariable Integer id) {
        return tagServices.getTagById(id);
    }

    @PostMapping
    public Tags createTag(@RequestBody Tags tag) {
        return tagServices.saveTag(tag);
    }
}
