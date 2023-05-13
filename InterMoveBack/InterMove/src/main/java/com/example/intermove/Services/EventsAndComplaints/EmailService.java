package com.example.intermove.Services.EventsAndComplaints;

import com.example.intermove.Entities.CandidatesAndCourses.Candidacy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendReminderEmail(String to, String subject, String body) throws MessagingException {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
    public void sendEmaill(String to, String subject, String user, Candidacy c) {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String htmlMsg = "<h3>Hello World!</h3>";
//mimeMessage.setContent(htmlMsg, "text/html"); /** Use this or below line **/
        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText("<!DOCTYPE html><html> <head> <title>Job Application Accepted</title> </head> <body style='font-family: Arial, sans-serif; font-size: 14px;'> <h1>Congratulations, Your Job Application Has Been Accepted!</h1> <p>Dear </p> <p>We are pleased to inform you that your application for the position of at *** has been accepted. You have been selected as one of our top candidates, and we believe that your skills and experience will be a great asset to our team.</p> <p>We will be contacting you shortly to discuss the next steps in the hiring process. In the meantime, please feel free to reach out to us if you have any questions or concerns.</p> <p>Thank you for your interest in working with us, and we look forward to welcoming you to our team!</p> <p>Best regards,<br>HR TEAM<br>****</p> </body> </html> ",true);

            mailSender.send(mimeMessage);
        }
        catch (Exception e){

            System.out.println(e.getMessage());
        }
    }
}
