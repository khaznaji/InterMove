package com.example.intermove.Entities.EventsAndComplaints;

import com.example.intermove.Entities.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String objet ;
    private String  message ;
    private String  image ;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH-ss-mm")
    private LocalDateTime date = LocalDateTime.now();
    @Enumerated(EnumType.STRING)
    private TypeClaim typeClaim;
    @Value("#{false}")
    private boolean status;
    @ManyToOne()
    @JsonIgnore

    User user ;

    public boolean getStatus() {
        return  status;
    }
}
