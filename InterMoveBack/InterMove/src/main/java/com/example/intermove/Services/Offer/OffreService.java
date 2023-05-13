package com.example.intermove.Services.Offer;

import com.example.intermove.Entities.Domain;
import com.example.intermove.Entities.Offer.*;

import com.example.intermove.Repositories.Offer.IOffreHistoryRepo;
import com.example.intermove.Repositories.Offer.IOffreInteressantRepo;
import com.example.intermove.Repositories.Offer.IOffreRepo;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;






@Slf4j
@Service
public class OffreService implements IOffreService{

    @Autowired
    IOffreRepo offreRepo;
    @Autowired
    private IOffreInteressantRepo offreInteressantRepo;

    @Autowired
    IOffreHistoryRepo offreHistoryRepo;




    @Override
    public Offer ajouteroffre(Offer off) {
        return offreRepo.save(off);
    }

    @Override
    public List<Offer> retrieveAllOffres() {
        return (List<Offer>) offreRepo.findAll();

    }

    @Override
    public Offer updateOffre1(Offer o, Integer idoffre) {
        o.setIdoffre(idoffre);
        return  offreRepo.save(o);

    }

    @Override
    public Offer retrieveOffre(Integer idoffre) {
        return offreRepo.findById(idoffre).get();

    }
    @Override
    public void removeOffre1(Integer idoffre) {
        Offer o=retrieveOffre(idoffre);
        offreRepo.delete(o);


    }

    @Override
    public void removeOffre(Integer idoffre,Integer id) {
        Offer o=retrieveOffre(idoffre);
      OfferInteressant o1=retrieveOffreintersss(idoffre);
        offreRepo.delete(o);
       offreInteressantRepo.delete(o1);


    }


    @Override
    public List<Offer> findByHistorique1() {
        return offreRepo.findByHistorique1();
    }

    @Override
    public List<Offer> listeroffres() {
        return offreRepo.listeroffres();
    }

    @Override
    public List<Offer> getOffreByHistorique(Boolean historique) {
        return offreRepo.findByHistorique(historique);
    }

    @Override
    public List<Offer> getoffresexist(Date startDate, Date endDate) {
        return offreRepo.getoffresexist(startDate, endDate);
    }

    public void getoffres(){
        for(Offer offre:listeroffres()){
            log.info("offre : "+offre.getTitre());


        }
    }

    @Override
    public void markOfferAsInteressant(Integer idoffre) {
        Offer offer = offreRepo.findById(idoffre).get();


        OfferInteressant interessant = new OfferInteressant();
        interessant.setOffer(offer);
        interessant.setDescription(offer.getDescription());
        interessant.setTitre(offer.getTitre());
        interessant.setDatedebut(offer.getDatedebut());
        interessant.setDatefin(offer.getDatefin());
        interessant.setDomain(offer.getDomain());
//        interessant.setHistorique(offer.getHistorique());
//        interessant.setRestaurer(offer.getRestaurer());
//       interessant.setInteresse(offer.getInteresse());


        offreInteressantRepo.save(interessant);

        offer.setInteresse(true);
        offreRepo.save(offer);

    }

    private OfferDTO mapToDTO(final Offer offer,
                              final OfferDTO offerDTO) {
        offerDTO.setIdoffre(offer.getIdoffre());
        offerDTO.setDescription(offer.getDescription());
        offerDTO.setTitre(offer.getTitre());
        offerDTO.setDatedebut(offer.getDatedebut());
        offerDTO.setDatefin(offer.getDatefin());
        offerDTO.setDomain(offer.getDomain());
        offerDTO.setInteresse(offer.getInteresse());
        offerDTO.setHistorique(offer.getHistorique());
        offerDTO.setRestaurer(offer.getRestaurer());

        //   offerDTO.setUserSell(sellerOffer.getUser() == null ? null : sellerOffer.getUser().getUserid());
        return offerDTO;
    }

    public List<OfferDTO> retrieveAllOffresdto() {
        final List<Offer> sellerOffers = offreRepo.findAll(Sort.by("idoffre"));
        return sellerOffers.stream()
                .map((sellerOffer) -> mapToDTO(sellerOffer, new OfferDTO()))
                .collect(Collectors.toList());
    }
    public List<OfferDTO> listeroffresdto() {
        final List<Offer> sellerOffers = offreRepo.listeroffres();
        return sellerOffers.stream()
                .map((sellerOffer) -> mapToDTO(sellerOffer, new OfferDTO()))
                .collect(Collectors.toList());    }

    public List<OfferDTO> findByHistorique1dto() {

        final List<Offer> sellerOffers = offreRepo.findByHistorique1();
        return sellerOffers.stream()
                .map((sellerOffer) -> mapToDTO(sellerOffer, new OfferDTO()))
                .collect(Collectors.toList());
    }

    @Override
    public OfferInteressant retrieveOffreintersss(int id) {

        return offreInteressantRepo.findById(id).get();

    }
    @Override
    public void removeOffreinterss(int id) {
        OfferInteressant o=retrieveOffreintersss(id);
        offreInteressantRepo.delete(o);
    }

    public Offer createOffer(Offer offer) {
        Offer savedOffer = offreRepo.save(offer);

        OfferInteressant history = new OfferInteressant();
        history.setOffer(savedOffer);
//        history.setTimestamp(LocalDateTime.now());
//        history.setAction("created");
        offreInteressantRepo.save(history);

        return savedOffer;
    }


    @Override
    public void exportcontrat(  int idoffre, String filePath) throws IOException {
        try {


            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, new FileOutputStream(filePath));
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Offer offer =  offreRepo.findById(idoffre).get();
            String titre ="Title : "+offer.getTitre();
            String description = "description: " + offer.getDescription();

//            String datedebut ="datedebut:"+ offer.getDatedebut().toString();

           // String datefin = "datefin: " + offer.getDatefin().toString();
            String currentDate = formatter.format(new Date());

            document.open();

            Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontTitle.setSize(20);

            Paragraph paragraph = new Paragraph("Offer ", fontTitle);
            paragraph.setAlignment(Paragraph.ALIGN_CENTER);

            Font fontParagraph = FontFactory.getFont(FontFactory.HELVETICA);
            fontParagraph.setSize(16);



            Paragraph paragraphTitre = new Paragraph(titre, fontParagraph);
            paragraphTitre.setAlignment(Paragraph.ALIGN_CENTER);


            Paragraph paragraphDescription = new Paragraph(description, fontParagraph);
            paragraphDescription.setAlignment(Paragraph.ALIGN_CENTER);


//            Paragraph paragraphDatedebut = new Paragraph(datedebut, fontParagraph);
//            paragraphDatedebut.setAlignment(Paragraph.ALIGN_CENTER);
//
//            Paragraph paragraphdatefin = new Paragraph(datefin, fontParagraph);
//            paragraphdatefin.setAlignment(Paragraph.ALIGN_CENTER);

            Paragraph paragraphcurrent = new Paragraph(currentDate, fontParagraph);
            paragraphcurrent.setAlignment(Paragraph.ALIGN_CENTER);

            document.add(paragraph);
            document.add(paragraphTitre);
            document.add(paragraphDescription);
//            document.add(paragraphDatedebut);
     //       document.add(paragraphdatefin);
            document.add(paragraphcurrent);
            document.close();

        }
        catch (DocumentException e) {
        }
    }




    @Override
    public OfferHistory retrieveOffreHistory(int id) {
        return offreHistoryRepo.findById(id).get();

    }
    @Override
    public void markOfferAsHistory(Integer idoffre) {
        Offer offer = offreRepo.findById(idoffre).get();

        OfferHistory history = new OfferHistory();
        history.setOffer(offer);
        history.setDescription(offer.getDescription());
        history.setTitre(offer.getTitre());
        history.setDatedebut(offer.getDatedebut());
        history.setDatefin(offer.getDatefin());
        history.setDomain(offer.getDomain());
//        interessant.setHistorique(offer.getHistorique());
        history.setRestaurer(offer.getRestaurer());
//       interessant.setInteresse(offer.getInteresse());


        // offreHistoryRepo.save(history);
        //   offreInteressantRepo.save(interessant);

        offer.setHistorique(true);
        Offer o=retrieveOffre(idoffre);

        offreHistoryRepo.save(history);




    }


    @Override
    public void Restaurer(Integer idoffre) {
        //  Offer offer = offreRepo.findById(idoffre).get();
        OfferHistory offerHistory = offreHistoryRepo.findById(idoffre).get();





        Offer offer = new Offer();
        //offer.setOffer(offerHistory);
        offer.setDescription(offerHistory.getDescription());
        offer.setTitre(offerHistory.getTitre());
        offer.setDatedebut(offerHistory.getDatedebut());
        offer.setDatefin(offerHistory.getDatefin());
        offer.setDomain(offerHistory.getDomain());
//        interessant.setHistorique(offer.getHistorique());
        offer.setRestaurer(offerHistory.getRestaurer());
//       interessant.setInteresse(offer.getInteresse());


        // offreRepo.save(offer);

        offerHistory.setRestaurer(false);
        OfferHistory o=retrieveOffreHistory(idoffre);
        offreRepo.save(offer);

        offreHistoryRepo.delete(o);






    }


    public List<OfferDTOH> retrieveAllOffresdtoh() {
        final List<OfferHistory> sellerOffers = offreHistoryRepo.findAll(Sort.by("idoffre"));
        return sellerOffers.stream()
                .map((sellerOffer) -> mapToDTO(sellerOffer, new OfferDTOH()))
                .collect(Collectors.toList());
    }


    private OfferDTOH mapToDTO(final OfferHistory offer,
                               final OfferDTOH offerDTOH) {
        offerDTOH.setIdoffre(offer.getIdoffre());
        offerDTOH.setDescription(offer.getDescription());
        offerDTOH.setTitre(offer.getTitre());
        offerDTOH.setDatedebut(offer.getDatedebut());
        offerDTOH.setDatefin(offer.getDatefin());
        offerDTOH.setDomain(offer.getDomain());
        offerDTOH.setRestaurer(offer.getRestaurer());

        //   offerDTO.setUserSell(sellerOffer.getUser() == null ? null : sellerOffer.getUser().getUserid());
        return offerDTOH;
    }

    @Override
    public List<OfferDTO> getinteresseOffers() {

        final List<Offer> sellerOffers = offreRepo.findByinteresseTrue();
        return sellerOffers.stream()
                .map((sellerOffer) -> mapToDTO(sellerOffer, new OfferDTO()))
                .collect(Collectors.toList());
    }


    @Override
    public List<OfferDTO> getOffreByDomain(Domain domain) {

        final List<Offer> sellerOffers = offreRepo.findByDomain(domain);
        return sellerOffers.stream()
                .map((sellerOffer) -> mapToDTO(sellerOffer, new OfferDTO()))
                .collect(Collectors.toList());

    }

    @Override
    public List<OfferDTO> getoffresexistdto(Date startDate, Date endDate) {
        final List<Offer> sellerOffers = offreRepo.getoffresexist(startDate, endDate);
        return sellerOffers.stream()
                .map((sellerOffer) -> mapToDTO(sellerOffer, new OfferDTO()))
                .collect(Collectors.toList());

    }

    public Offer save(Offer employee) {
        return offreRepo.save(employee);
    }
    @Override
    public Offer getOffersById(Integer idoffre) {
        return offreRepo.findById(idoffre).get();
    }


    public Optional<Offer> findById(Integer idoffre) {
        return offreRepo.findById(idoffre);
    }






}
