package com.example.intermove.Repositories.Offer;

import com.example.intermove.Entities.Offer.OfferInteressant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOffreInteressantRepo extends JpaRepository<OfferInteressant, Integer> {
   // List<OfferInteressant> findByinteresseTrue();


}
