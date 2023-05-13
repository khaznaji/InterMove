package com.example.intermove.Services.Offer;
import com.example.intermove.Entities.Offer.Offer;
import com.example.intermove.Repositories.Offer.IOffreRepo;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.awt.*;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
@Service

public class PDFService {

    @Autowired
    private final IOffreRepo offerRepository;




    public PDFService(IOffreRepo offerRepository
    ) {
        this.offerRepository = offerRepository;


    }



    public void export(int id, OutputStream outputStream) throws IOException {

//create docc


        Document document = new Document(PageSize.A4);

        PdfWriter.getInstance(document,outputStream);
        FileOutputStream pdfOutputFile = new FileOutputStream("./sample1.pdf");
        Offer offer = offerRepository.findById(id).get();
        //String propertyType = "NEW  : "+offer.getProperty().getType().toString();
        String titre = " Nouvelle offre  : "+offer.getTitre().toString();

        String description = "Description  : "+offer.getDescription().toString();
        String datedebut = "Datedebut : "+offer.getDatedebut();
        String datefin = "Datefin : "+offer.getDatefin();


        final PdfWriter pdfWriter = PdfWriter.getInstance(document, pdfOutputFile);


        Font fontTitle= FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(13);




        pdfWriter.setPageEvent(new PdfPageEventHelper());
        document.open();

    /*Image jpg = Image.getInstance("test.png");
    jpg.setAlignment(jpg.ALIGN_CENTER);
    jpg.scaleAbsolute(100,90);*/






        Paragraph paragraph = new Paragraph("OFFER",fontTitle);
        paragraph.setAlignment(Paragraph.ALIGN_CENTER);

        Font fontParagraph = FontFactory.getFont(FontFactory.HELVETICA);
        fontParagraph.setSize(10);
        fontParagraph.setColor(Color.red);
        Paragraph footer1 = new Paragraph(titre,fontTitle);
        footer1.setAlignment(Paragraph.ALIGN_BOTTOM);
        Paragraph footer2 = new Paragraph(description,fontTitle);
        footer2.setAlignment(Paragraph.ALIGN_BOTTOM);
        Paragraph footer3 = new Paragraph(datedebut,fontTitle);
        footer3.setAlignment(Paragraph.ALIGN_BOTTOM);
        Paragraph footer4 = new Paragraph(datefin,fontTitle);
        footer4.setAlignment(Paragraph.ALIGN_BOTTOM);
   /* Paragraph type = new Paragraph(propertyType,fontTitle);
    footer1.setAlignment(Paragraph.ALIGN_BOTTOM);

    Paragraph details = new Paragraph(description1,fontTitle);
    footer1.setAlignment(Paragraph.ALIGN_BOTTOM);

    Paragraph paragraph1=new Paragraph(date,fontParagraph);
    paragraph1.setAlignment(Paragraph.ALIGN_CENTER);

    Paragraph paragraph2 = new Paragraph(email,fontTitle);
    paragraph2.setAlignment(Paragraph.ALIGN_BOTTOM);*/







        //document.add(jpg);
        document.add(paragraph);
        document.add(footer1);
        document.add(footer2);

        document.add(footer3);

        document.add(footer4);

    /*document.add(paragraph1);
    document.add(type);
    document.add(footer1);
    document.add(details);
    document.add(paragraph2);*/
        document.close();
        pdfWriter.close();

    }}
