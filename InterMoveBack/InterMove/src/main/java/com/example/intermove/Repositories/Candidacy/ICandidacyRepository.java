package com.example.intermove.Repositories.Candidacy;

import com.example.intermove.Entities.CandidatesAndCourses.Candidacy;
import com.example.intermove.Entities.CandidatesAndCourses.CandidacyStatus;
import com.example.intermove.Entities.Offer.Offer;
import com.example.intermove.Entities.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ICandidacyRepository extends JpaRepository<Candidacy, Integer> {

    List<Candidacy> findByUser(User user);

    List<Candidacy> findByOffer(Offer offer);

    List<Candidacy> findByStatus(CandidacyStatus status);

    List<Candidacy> findByDateCandidacyAfter(Date date);

    List<Candidacy> findByUserAndDateCandidacyAfter(User user, Date date);

    List<Candidacy> findByOfferAndDateCandidacyAfter(Offer offer, Date date);

    Candidacy findByUserAndOffer(User user, Offer offer);

    //    @Query("Select o.idO From Candidacy a , OfferTag o where a.offer.idoffre=o.idO and a.idC=:id ")
    @Query(
            value="Select t.name_tag From candidacy a , offer_tags o , tags t where a.idoffre=o.offers_idoffre and o.tags_id_tags=t.id_tags and a.idc=:id ",
    nativeQuery = true)
    List<String> getOfferTag(@Param("id")int id);


    List<Candidacy> findAllByUserUserid(int id);

}
