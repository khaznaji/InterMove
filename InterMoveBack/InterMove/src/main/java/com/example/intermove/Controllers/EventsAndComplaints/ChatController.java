package com.example.intermove.Controllers.EventsAndComplaints;

import com.example.intermove.Entities.EventsAndComplaints.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@CrossOrigin(origins = "*")
public class ChatController {

	@MessageMapping("/{topic}/chat.sendMessage")
	@SendTo("/topic/{topic}")
	public ChatMessage sendMessage(@DestinationVariable String topic, @Payload ChatMessage chatMessage) {
		return chatMessage;
	}

	@MessageMapping("/{topic}/chat.addUser")
	@SendTo("/topic/{topic}")
	public ChatMessage addUser(@DestinationVariable String topic, @Payload ChatMessage chatMessage, SimpMessageHeaderAccessor header) {
		header.getSessionAttributes().put("username", chatMessage.getSender());
		header.getSessionAttributes().put("topic", topic);
		return chatMessage;
	}

	@GetMapping("/room")
	public ModelAndView room() {
		return new ModelAndView("index");
	}


}
