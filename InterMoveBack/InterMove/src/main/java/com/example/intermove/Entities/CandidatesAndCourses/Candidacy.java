package com.example.intermove.Entities.CandidatesAndCourses;

import com.example.intermove.Entities.Offer.Offer;
import com.example.intermove.Entities.User.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Candidacy implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idC ;
//    private String firstName;
//    private String lastName;
//    private String email;
//    private String phoneNumber;
    private  float score;

    public CandidacySituation getSituation() {
        return Situation;
    }

    public void setSituation(CandidacySituation situation) {
        Situation = situation;
    }

    @CreationTimestamp
    private Date dateCandidacy;
    @Enumerated(EnumType.STRING)
    private CandidacySituation Situation = CandidacySituation.Wait;
    @Enumerated(EnumType.STRING)
    private CandidacyStatus status = CandidacyStatus.Poor;




    public Candidacy(Integer idC, String firstName, String lastName, String email, String phoneNumber, float score, Date dateCandidacy, CandidacyStatus status, Offer offer, User user) {
        this.idC = idC;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.phoneNumber = phoneNumber;
        this.score = score;
        this.dateCandidacy = dateCandidacy;
        this.status = status;
        this.offer = offer;
        this.user = user;

    }

    //    @ManyToOne
//    @JsonIgnore
//    Offer offer;
    @ManyToOne(fetch = FetchType.EAGER)

    @JoinColumn(name = "idoffre")
    private Offer offer;
    //(fetch = FetchType.LAZY)
    //@JoinColumn(name = "offer_id")


    @ManyToOne(fetch = FetchType.EAGER)

    @JoinColumn(name = "userid")
    private User user;
            //(fetch = FetchType.LAZY)
    //@JoinColumn(name = "student_id")


    @OneToOne(cascade = CascadeType.REMOVE)
    Document documents;

}
