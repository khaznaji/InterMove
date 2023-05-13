package com.example.intermove.Services.forum;


import com.example.intermove.Controllers.forum.ResourceNotFoundException;

import com.example.intermove.Entities.forum.Message;

import com.example.intermove.Repositories.forum.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message getMessageById(Long messageID) {
        return messageRepository.findById(messageID)
                .orElseThrow(() -> new ResourceNotFoundException("Message", "messageID", messageID));
    }

    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    public Message updateMessage(Long messageID, Message messageDetails) {
        Message message = getMessageById(messageID);
        message.setContent(messageDetails.getContent());
        message.setSent_at(messageDetails.getSent_at());
        return messageRepository.save(message);
    }

    public void deleteMessage(Long messageID) {
        messageRepository.deleteById(messageID);
    }
   public List<Object[]> findUsersAndLastMessageDateByMessages (int userid){
       List<Object[]> users = messageRepository.findUsersAndLastMessageDateByMessages(userid);

       return users ;
   }

    public List<Message> findMessagesBetweenUsersSortedByDate( int user1,int user2){
        return messageRepository.findMessagesBetweenUsersSortedByDate(user1,user2);
    }
    @Transactional

    public void deleteConversationBetweenUsers(int user1Id, int user2Id) {
        messageRepository.deleteConversationBetweenUsers(user1Id, user2Id);
    }

}
