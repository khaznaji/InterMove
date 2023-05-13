package com.example.intermove.Entities.Offer;

import com.example.intermove.Entities.Domain;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.Date;


@Getter
@Setter
public class OfferDTOH {
    @Id
    @GeneratedValue(strategy =

            GenerationType.IDENTITY)
    private int idoffre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offer_id")
    private Offer offer;
    private String description ;
    private String titre;
    private Date datedebut ;
    private Date datefin ;
    //    private Boolean historique;
    private Boolean restaurer=true;
//    private Boolean  interesse =true;

    @Enumerated(EnumType.STRING)
    Domain domain;

    public int getIdoffre() {
        return idoffre;
    }

    public void setIdoffre(int idoffre) {
        this.idoffre = idoffre;
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

    public Boolean getRestaurer() {
        return restaurer;
    }

    public void setRestaurer(Boolean restaurer) {
        this.restaurer = restaurer;
    }

    public Domain getDomain() {
        return domain;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }
}



