package com.example.intermove.Controllers.Candidacy;

import com.example.intermove.Entities.CandidatesAndCourses.Document;
import com.example.intermove.Services.Candidacy.DocumentService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/assign")
    public ResponseEntity<Void> assignDocumentToCandidacy(@RequestParam Integer candidacyId, @RequestParam MultipartFile file) throws IOException {
        documentService.assignDocumentToCandidacy(candidacyId, file);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{documentId}/download")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Integer documentId) throws IOException {
        Document document = documentService.getDocumentByCandidacy(documentId);

        // Read the file as a byte array
        File file = new File(document.getNameDoc());
        byte[] fileContent = Files.readAllBytes(file.toPath());

        // Set the content type and disposition headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename(file.getName()).build());

        return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
    }

}