package com.example.intermove.Controllers.Candidacy;

import com.example.intermove.Entities.CandidatesAndCourses.Candidacy;
import com.example.intermove.Entities.CandidatesAndCourses.Email;
import com.example.intermove.Services.Candidacy.ICandidacyServices;
import com.example.intermove.Services.EventsAndComplaints.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EmailService emailService;
    @Autowired
    ICandidacyServices candidacyService;
    @PostMapping("/send/{id}")
    public ResponseEntity<String> sendEmail(@RequestBody Email emailDto,@PathVariable(value = "id") int id) throws MessagingException {
        String to = emailDto.getTo();
        String subject = emailDto.getSubject();
        Candidacy c=candidacyService.getCandidatureById(id);
        String body = "<h1>Congratulations, Your Job Application Has Been Accepted!</h1> <p>Dear [Candidate Name]<p>We are pleased to inform you that your application for the position of [Job Title] at [Company Name] has been accepted. You have been selected as one of our top candidates, and we believe that your skills and experience will be a great asset to our team.</p>";

        emailService.sendEmaill(to, subject, "user",c);
        return ResponseEntity.ok("Email sent successfully.");
    }
}
