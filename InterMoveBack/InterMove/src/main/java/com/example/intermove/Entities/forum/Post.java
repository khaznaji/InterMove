package com.example.intermove.Entities.forum;

import com.example.intermove.Entities.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Post implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long postID;
    private String title;
    private String postdescription;
    private String postimage;
    private int nbrLIKE;
    private LocalDateTime created_at;
 @ManyToOne
 @JsonIgnore
 private User user;
@OneToMany(mappedBy = "post")
    @JsonIgnore
   List<Comment> commentaires;
    @PrePersist
    protected void onCreate() {
        this.created_at = LocalDateTime.now();
    }

}
