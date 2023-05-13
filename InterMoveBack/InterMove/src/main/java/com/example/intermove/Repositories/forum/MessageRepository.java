package com.example.intermove.Repositories.forum;

import com.example.intermove.Entities.forum.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT u.userid, m.sent_at FROM User u JOIN Message m ON u.userid = m.sender.userid OR u.userid = m.receiver.userid WHERE (m.sender.userid = :userid OR m.receiver.userid = :userid) AND u.userid <> :userid AND m.sent_at = (SELECT MAX(m2.sent_at) FROM Message m2 WHERE (m2.sender.userid = m.sender.userid AND m2.receiver.userid = m.receiver.userid) OR (m2.sender.userid = m.receiver.userid AND m2.receiver.userid = m.sender.userid)) GROUP BY u.userid, m.sent_at ORDER BY m.sent_at DESC")
    List<Object[]> findUsersAndLastMessageDateByMessages(@Param("userid") int userId);

    @Query("SELECT m FROM Message m WHERE (m.sender.userid = :user1 AND m.receiver.userid = :user2) OR (m.sender.userid = :user2 AND m.receiver.userid = :user1) ORDER BY m.sent_at DESC")
    List<Message> findMessagesBetweenUsersSortedByDate(@Param("user1") int user1, @Param("user2") int user2);
    @Modifying
    @Query("DELETE FROM Message m WHERE (m.sender.userid = :user1 AND m.receiver.userid = :user2) OR (m.sender.userid = :user2 AND m.receiver.userid = :user1)")
    void deleteConversationBetweenUsers(@Param("user1") int user1, @Param("user2") int user2);

}


