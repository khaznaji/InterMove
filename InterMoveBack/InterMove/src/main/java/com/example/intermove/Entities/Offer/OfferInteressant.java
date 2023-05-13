package com.example.intermove.Entities.Offer;

import com.example.intermove.Entities.Domain;

import javax.persistence.*;
import java.util.Date;

@Entity

public class OfferInteressant {
    @Id
    @GeneratedValue(strategy =

            GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offer_id")
    private Offer offer;
    private String description ;
    private String titre;
    private Date datedebut ;
    private Date datefin ;
//    private Boolean historique;
//    private Boolean restaurer;
//    private Boolean  interesse =true;

    @Enumerated(EnumType.STRING)
    Domain domain;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
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

    public Domain getDomain() {
        return domain;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }
}
