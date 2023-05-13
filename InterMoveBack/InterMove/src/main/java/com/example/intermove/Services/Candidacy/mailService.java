package com.example.intermove.Services.Candidacy;

import com.example.intermove.Services.EventsAndComplaints.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class mailService {
    @Autowired
    private EmailService emailService;

    public void sendEmail() {
        String to = "karoui.maziz@gmail.com";
        String subject = "Test Email";
        String body = "This is a test email sent from Spring Boot!";
        //emailService.sendEmaill(to, subject, body);
    }
}
