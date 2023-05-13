package com.example.intermove.Services.User;


import com.example.intermove.Payload.Mail;

public interface EmailService {

    public void sendCodeByMail(Mail mail);
}
