package com.example.intermove.Controllers.Offer;


import com.example.intermove.Entities.Offer.Offer;
import com.example.intermove.Services.Offer.OffreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController

@RequestMapping("/interessant")
public class InteressantController {

    @Autowired
    OffreService offreService;

    @PutMapping("interesse/{idoffre}")
    public ResponseEntity<?> markOfferAsinteresse(@PathVariable int idoffre) {
        offreService.markOfferAsInteressant(idoffre);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove-offre/{id}")
    public void removeOffre(@PathVariable("id") int id) {
        offreService.removeOffreinterss(id);
    }

    @PostMapping
    public ResponseEntity<Offer> createOffer(@RequestBody Offer offer) {
        if (offer.getDatefin().before(new Date())){


            Offer savedOffer = offreService.createOffer(offer);
            return ResponseEntity.ok(savedOffer);}
        Offer savedOffer = offreService.ajouteroffre(offer);
        return ResponseEntity.ok(savedOffer);    }




}
