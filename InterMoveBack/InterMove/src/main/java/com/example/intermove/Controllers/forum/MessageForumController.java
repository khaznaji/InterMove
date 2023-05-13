package com.example.intermove.Controllers.forum;

import com.example.intermove.Entities.forum.Message;
import com.example.intermove.Services.forum.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageForumController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/{messageID}")
    public Message getMessageById(@PathVariable Long messageID) {
        return (Message) messageService.getMessageById(messageID);
    }

    @PostMapping
    public Message createMessage(@RequestBody Message message) {
        return  messageService.createMessage(message);
    }

    @PutMapping("/{messageID}")
    public Message updateMessage(@PathVariable Long messageID, @RequestBody Message messageDetails) {
        return (Message) messageService.updateMessage(messageID,  messageDetails);
    }

    @DeleteMapping("/{messageID}")
    public void deleteMessage(@PathVariable Long messageID) {
        messageService.deleteMessage(messageID);
    }
    @GetMapping("/test/{userid}")
    public List<Object[]> findUsersAndLastMessageDateByMessages (@PathVariable int userid){
        return messageService.findUsersAndLastMessageDateByMessages(userid);
    }

    @GetMapping("/conversation")
    public List<Message> findMessagesBetweenUsersSortedByDate(@PathParam(value = "user1") int user1,@PathParam(value = "user2") int user2){
        return messageService.findMessagesBetweenUsersSortedByDate(user1,user2);
    }
    @DeleteMapping("/conversation")
    public void deleteConversationBetweenUsers(@PathParam(value = "user1Id") int user1Id,@PathParam(value = "user2Id") int user2Id) {
        messageService.deleteConversationBetweenUsers(user1Id, user2Id);
    }
}


