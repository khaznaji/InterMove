package com.example.intermove.Services.Candidacy;

import com.example.intermove.Entities.CandidatesAndCourses.Candidacy;
import com.example.intermove.Entities.CandidatesAndCourses.Document;
import com.example.intermove.Repositories.Candidacy.DocumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;


@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public void assignDocumentToCandidacy(Integer candidacyId, MultipartFile file) throws IOException {
        Candidacy candidacy = new Candidacy();
        candidacy.setIdC(candidacyId);

        Document document = new Document();
        document.setCandidacy(candidacy);

        // Save the file to the file system
        String fileName = file.getOriginalFilename();
       // String filePath = "path/to/save/the/file/" + fileName;
        String filePath = "" + UUID.randomUUID().toString() + ".pdf";
//C:/Users/Aziz/Desktop/karoui123/PiAnSp123/PidevSpring/InterMove/src/pdf
        File savedFile = new File(filePath);
        file.transferTo(savedFile);

        document.setNameDoc(filePath);

        documentRepository.save(document);
    }

    public Document getDocumentById(Integer documentId) {
      return documentRepository.findById(documentId).orElse(null);
    }
    public  Document getDocumentByCandidacy (Integer id)
    {
        return  documentRepository.findByCandidacy_IdC(id);

    }
}
