package com.example.intermove.Entities.forum;

import com.example.intermove.Entities.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Message {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long messageID ;
    private String content;
    private LocalDateTime sent_at;

    @ManyToOne
    private User sender;
    @ManyToOne
    private User receiver;
    @PrePersist
    protected void onCreate() {
        this.sent_at = LocalDateTime.now();
}}