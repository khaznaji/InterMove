package com.example.intermove.Services.SkillsAndQuizz;

import com.example.intermove.Entities.SkillsAndQuizz.Skills;
import com.example.intermove.Repositories.SkillsAndQuizz.QuizRepository;
import com.example.intermove.Repositories.SkillsAndQuizz.SkillsRepository;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.pdf.PdfPageEventHelper;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

@Service
public class PDFGeneratorService {



    @Autowired
    private SkillsRepository skillsRepository;
    @Autowired
    private QuizRepository quizRepository;




    public PDFGeneratorService(SkillsRepository skillsRepository,QuizRepository quizRepository) {
        this.skillsRepository = skillsRepository;
        this.quizRepository = quizRepository;

    }



    public void export(Integer id, OutputStream outputStream) throws IOException {


        //create docc


        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document,outputStream);
        FileOutputStream pdfOutputFile = new FileOutputStream("./sample1.pdf");
        Skills skills = skillsRepository.findById(id).get();

        String description = "votre message de motivation : "+skills.getDescription();
        String email = "pour plus d'information sur le quiz déja fait "+skills.getQuiz().getNom();
        String description1 = "votre domain de ton skill : "+skills.getDomain()+"\n\n\n\n\n\n\n\n\n\n\n\n";
        String date = "Date limite pour postuler est : "+skills.getQuiz().getNom();
        final PdfWriter pdfWriter = PdfWriter.getInstance(document, pdfOutputFile);


        Font fontTitle= FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(13);

        pdfWriter.setPageEvent(new PdfPageEventHelper());
        document.open();

        Image jpg = Image.getInstance("Capture3 .PNG");
        jpg.setAlignment(jpg.ALIGN_CENTER);
        jpg.scaleAbsolute(100,90);






        Paragraph paragraph = new Paragraph("SKILLS",fontTitle);
        paragraph.setAlignment(Paragraph.ALIGN_CENTER);

        Font fontParagraph = FontFactory.getFont(FontFactory.HELVETICA);
        fontParagraph.setSize(10);
        fontParagraph.setColor(Color.red);
        Paragraph footer1 = new Paragraph(description,fontTitle);
        footer1.setAlignment(Paragraph.ALIGN_BOTTOM);

        Paragraph details = new Paragraph(description1,fontTitle);
        footer1.setAlignment(Paragraph.ALIGN_BOTTOM);

        Paragraph paragraph1=new Paragraph(date,fontParagraph);
        paragraph1.setAlignment(Paragraph.ALIGN_CENTER);

        Paragraph paragraph2 = new Paragraph(email,fontTitle);
        paragraph2.setAlignment(Paragraph.ALIGN_BOTTOM);







        document.add(jpg);
        document.add(paragraph);
        document.add(paragraph1);
        document.add(footer1);
        document.add(details);
        document.add(paragraph2);
        document.close();
        pdfWriter.close();


    }

}