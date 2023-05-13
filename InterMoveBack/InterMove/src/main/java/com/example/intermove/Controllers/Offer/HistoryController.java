package com.example.intermove.Controllers.Offer;


import com.example.intermove.Services.Offer.OffreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/history")
public class HistoryController {

    @Autowired
    OffreService offreService;



    @PutMapping("history/{idoffre}")
    public ResponseEntity<?> markOfferAsHistory(@PathVariable int idoffre) {
        offreService.markOfferAsHistory(idoffre);
        return ResponseEntity.ok().build();
    }

    @PutMapping("history2/{idoffre}")
    public ResponseEntity<?> Restaurer(@PathVariable int idoffre) {
        offreService.Restaurer(idoffre);
        return ResponseEntity.ok().build();
    }


}
