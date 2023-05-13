package com.example.intermove.Controllers.EventsAndComplaints;

import com.example.intermove.Entities.User.User;
import com.example.intermove.Services.EventsAndComplaints.TwillioServiceImpl;
import com.example.intermove.Services.User.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/twilio")
public class TwillioController {
    @Autowired
    private  TwillioServiceImpl twilioService;


    @Autowired
    private UserService userService;

    @PostMapping("/make-call/{userId}")
    public void makeCall(@PathVariable int userId, @RequestBody String message) {

        try {
            User user = userService.getUserById(userId);
            twilioService.makeCall(user.getPhone(), message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }}

