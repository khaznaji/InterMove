package com.example.intermove.Entities.forum;

import com.example.intermove.Entities.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Comment implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long commentID;
    private String content;

    private LocalDateTime created_at;
    @ManyToOne
    private Post post ;
    @PrePersist
    protected void onCreate() {
        this.created_at = LocalDateTime.now();
    }
    @ManyToOne
    private User user ;
}
