package com.example.intermove.Entities.CandidatesAndCourses;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;
    private  Integer idCandidacy;
    private String NameDoc;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdCandidacy() {
        return idCandidacy;
    }

    public void setIdCandidacy(Integer idCandidacy) {
        this.idCandidacy = idCandidacy;
    }

    public String getNameDoc() {
        return NameDoc;
    }

    public void setNameDoc(String nameDoc) {
        NameDoc = nameDoc;
    }

    public Candidacy getCandidacy() {
        return candidacy;
    }

    public void setCandidacy(Candidacy candidacy) {
        this.candidacy = candidacy;
    }

    @OneToOne
            @JsonIgnore
    Candidacy candidacy;




}
