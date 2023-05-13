package com.example.intermove.Entities.Offer;

import com.example.intermove.Entities.CandidatesAndCourses.Candidacy;
import com.example.intermove.Entities.CandidatesAndCourses.Tags;
import com.example.intermove.Entities.Domain;
import com.example.intermove.Entities.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Offer {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int idoffre;
    private String titre;
    private String description ;
    private Date datedebut ;
    private Date datefin ;
    private Boolean historique=false;
    private Boolean restaurer=true;
    private Boolean  interesse =false;


    @Enumerated(EnumType.STRING)
    Domain domain;
    @OneToMany(mappedBy="offers")
    @JsonIgnore
    private Set<User> user;
    @OneToMany(mappedBy = "offer",cascade = CascadeType.ALL )
            @JsonIgnore
    List<Candidacy> candidacies;

    @ManyToMany
    @JsonIgnore
    List<Tags> tags;

    @OneToMany(mappedBy = "offer")
    @JsonIgnore
    private List<OfferInteressant> offerInteressants;
    @OneToMany(mappedBy = "offer")
    @JsonIgnore
    private List<OfferHistory> offerHistories;

    public Offer(int idoffre) {
        this.idoffre = idoffre;
    }

    public int getIdoffre() {
        return idoffre;
    }

    public void setIdoffre(int idoffre) {
        this.idoffre = idoffre;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDatedebut() {
        return datedebut;
    }

    public void setDatedebut(Date datedebut) {
        this.datedebut = datedebut;
    }

    public Date getDatefin() {
        return datefin;
    }

    public void setDatefin(Date datefin) {
        this.datefin = datefin;
    }

    public Boolean getHistorique() {
        return historique;
    }

    public void setHistorique(Boolean historique) {
        this.historique = historique;
    }

    public Boolean getRestaurer() {
        return restaurer;
    }

    public void setRestaurer(Boolean restaurer) {
        this.restaurer = restaurer;
    }

    public Boolean getInteresse() {
        return interesse;
    }

    public void setInteresse(Boolean interesse) {
        this.interesse = interesse;
    }

    public Domain getDomain() {
        return domain;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }






    ////////////




//
//    @Enumerated(EnumType.STRING)
//    Domain domain;
//    @ManyToMany(cascade = CascadeType.ALL, mappedBy="offers")
//    public List<User> users;
////    @OneToMany(mappedBy = "offer",cascade = CascadeType.ALL )
////    List<Candidacy> candidacies;
//
//    @ManyToMany
//    List<Tags> tags;
//
//    @OneToMany(mappedBy = "offer")
//    private List<OfferInteressant> offerInteressants;
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "offer")
//    private List<OfferHistory> offerHistories;
//
//    public Offer(int idoffre) {
//        this.idoffre = idoffre;
//    }
//
//    public List<User> getUsers() {
//        return users;
//    }
//
//    public void setUsers(List<User> users) {
//        this.users = users;
//    }
//
//    public int getIdoffre() {
//        return idoffre;
//    }
//
//    public void setIdoffre(int idoffre) {
//        this.idoffre = idoffre;
//    }
//
//    public String getTitre() {
//        return titre;
//    }
//
//    public void setTitre(String titre) {
//        this.titre = titre;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public Date getDatedebut() {
//        return datedebut;
//    }
//
//    public void setDatedebut(Date datedebut) {
//        this.datedebut = datedebut;
//    }
//
//    public Date getDatefin() {
//        return datefin;
//    }
//
//    public void setDatefin(Date datefin) {
//        this.datefin = datefin;
//    }
//
//    public Boolean getHistorique() {
//        return historique;
//    }
//
//    public void setHistorique(Boolean historique) {
//        this.historique = historique;
//    }
//
//    public Boolean getRestaurer() {
//        return restaurer;
//    }
//
//    public void setRestaurer(Boolean restaurer) {
//        this.restaurer = restaurer;
//    }
//
//    public Boolean getInteresse() {
//        return interesse;
//    }
//
//    public void setInteresse(Boolean interesse) {
//        this.interesse = interesse;
//    }
//
//    public Domain getDomain() {
//        return domain;
//    }
//
//    public void setDomain(Domain domain) {
//        this.domain = domain;
//    }
}
