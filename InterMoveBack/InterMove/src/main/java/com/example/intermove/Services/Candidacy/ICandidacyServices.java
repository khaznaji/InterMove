package com.example.intermove.Services.Candidacy;

import com.example.intermove.Entities.CandidatesAndCourses.Candidacy;
import com.example.intermove.Entities.CandidatesAndCourses.CandidacyStatus;
import com.example.intermove.Entities.Offer.Offer;
import com.example.intermove.Entities.User.User;

import java.util.Date;
import java.util.List;

public interface ICandidacyServices {

   // Candidacy addCandidacy(Candidacy candidacy);

    Candidacy createCandidature(Candidacy candidature);
    Candidacy updateCandidacy(Integer id,Candidacy candidacy);
 Candidacy updateCandidacyStatus(Integer id,float score);
   // Candidacy updateCandidature(Candidacy candidature);
    Offer getOffreTagsbByCandidature(int id);
    void deleteCandidature(int id);

    List<Candidacy> getAllCandidacies();
    Candidacy getCandidatureById(int id);
    public List<Candidacy> getCandidaturesByUser(User user);


 //List<Candidacy> getCandidaturesByUser(User user);

    List<Candidacy> getCandidaturesByOffer(Offer offer);

    List<Candidacy> getCandidaturesByStatus(CandidacyStatus status);

    List<Candidacy> getCandidaturesSubmittedAfterDate(Date date);

    List<Candidacy> getCandidaturesSubmittedByUserAfterDate(User user, Date date);

    List<Candidacy> getCandidaturesSubmittedForOfferAfterDate(Offer offer, Date date);

    Candidacy getCandidatureByUserAndOffer(User user, Offer offer);

    void acceptCandidature(Candidacy candidature);
 Candidacy acceptCandidature(int id);
    Candidacy rejectCandidature(int id);
    void rejectCandidature(Candidacy candidature);

    void updateCandidatureStatus(Candidacy candidature, CandidacyStatus status);
 public List<String> getOfferT(int id);

    public List<Candidacy> getAllCandidaciesByUserId(int id) ;

    }














//    Candidacy addCandidacy(Candidacy candidacy);
//    public Candidacy createCandidature(Candidacy candidature);
//    public Candidacy updateCandidature(Candidacy candidature);
//    public void deleteCandidature(int idC);
//    public Candidacy getCandidatureById(int id);
//   // public List<Candidacy> getCandidaturesByUser(User user);
//    public List<Candidacy> getCandidaturesByOffer(Offer offer);
//    public List<Candidacy> getCandidaturesByStatus(CandidacyStatus status);
//    public List<Candidacy> getCandidaturesSubmittedAfterDate(Date date);
//  //  public List<Candidacy> getCandidaturesSubmittedByUserAfterDate(User user, Date date);
//    public List<Candidacy> getCandidaturesSubmittedForOfferAfterDate(Offer offer, Date date);
//   // public Candidacy getCandidatureByUserAndOffer(User user, Offer offer);
//    public void acceptCandidature(Candidacy candidature);
//    public void rejectCandidature(Candidacy candidature);
//    public void updateCandidatureStatus(Candidacy candidature, CandidacyStatus status);




