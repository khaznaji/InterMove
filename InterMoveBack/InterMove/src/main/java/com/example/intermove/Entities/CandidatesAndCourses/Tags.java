package com.example.intermove.Entities.CandidatesAndCourses;

import com.example.intermove.Entities.Offer.Offer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Tags {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer idTags;
    private String NameTag;

    public String getNameTag() {
        return NameTag;
    }

    public void setNameTag(String nameTag) {
        NameTag = nameTag;
    }



    public List<Offer> getOffers() {
        return offers;
    }

    public void setOffers(List<Offer> offers) {
        this.offers = offers;
    }

    //    @ManyToMany(mappedBy = "tags")
//    @JsonIgnore
//    List<Courses> courses;
@ManyToMany(mappedBy = "tags")
        @JsonIgnore
List<Courses> courses;

    public Integer getIdTags() {
        return idTags;
    }

    public void setIdTags(Integer idTags) {
        this.idTags = idTags;
    }

    @ManyToMany(mappedBy = "tags")
            @JsonIgnore
    List<Offer> offers;
}
