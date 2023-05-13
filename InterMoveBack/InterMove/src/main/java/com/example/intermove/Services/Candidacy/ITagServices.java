package com.example.intermove.Services.Candidacy;

import com.example.intermove.Entities.CandidatesAndCourses.Courses;
import com.example.intermove.Entities.CandidatesAndCourses.Tags;
import com.example.intermove.Entities.Offer.Offer;

import java.util.List;

public interface ITagServices {
    Tags createTag(Tags tags);

    public Offer assignTagsToOffer(Integer offerId, List<Integer> tagIds);

    public Courses assignTagsToCourse(Integer CourseId, List<Integer> tagIds);

    Tags getTagById(Integer id);

    List<Tags> getAllTags();

    Tags saveTag(Tags tag);
}
