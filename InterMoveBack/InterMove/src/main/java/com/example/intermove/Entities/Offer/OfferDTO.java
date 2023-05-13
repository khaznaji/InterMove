package com.example.intermove.Entities.Offer;

import com.example.intermove.Entities.Domain;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;


@Getter
@Setter
public class OfferDTO {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int idoffre;
    private String titre;
    private String description ;
    private Date datedebut ;
    private Date datefin ;
    private Boolean historique=false;
    private Boolean restaurer;
    private Boolean  interesse =false;


    @Enumerated(EnumType.STRING)
    Domain domain;
}
