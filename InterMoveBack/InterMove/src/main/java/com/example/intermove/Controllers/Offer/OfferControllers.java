package com.example.intermove.Controllers.Offer;

import com.example.intermove.Entities.Domain;
import com.example.intermove.Entities.Offer.Offer;
import com.example.intermove.Entities.Offer.OfferDTO;

import com.example.intermove.Entities.Offer.OfferDTOH;
import com.example.intermove.Services.Offer.IOffreService;
import com.example.intermove.Services.Offer.OffreService;
import com.example.intermove.Services.Offer.PDFService;
import com.example.intermove.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;



@RestController
@CrossOrigin("*")
@RequestMapping("/gestionoffre")
public class OfferControllers {

    @Autowired
    OffreService offreService;
    @Autowired
    IOffreService iOffreService;




  /*  @PostMapping("/addoffer")

    public Offer ajouteroffre(@RequestBody Offer off){

        return offreService.ajouteroffre(off);
    }*/

    @GetMapping("/retrieve-all-offres")
    public List<Offer> getOffres() {
        List<Offer> offreList = offreService.retrieveAllOffres();
        return offreList;
    }

    @PutMapping ("/updateOffre1/{idoffre}")
    public Offer updateOffre1 ( @PathVariable int idoffre, @RequestParam ("titre") String titre,
                                @RequestParam ("description") String description ,@RequestParam ("datedebut") Date datedebut,
                                @RequestParam ("datefin") Date datefin,@RequestParam ("historique") Boolean historique,
                                @RequestParam ("restaurer") Boolean restaurer, @RequestParam ("domain") Domain domain,@RequestParam ("interesse") Boolean interesse){
        Offer offre = new Offer() ;
        offre.setTitre(titre);
        offre.setDescription(description);
        offre.setDatedebut(datedebut);
        offre.setDatefin(datefin);
        offre.setHistorique(historique);
        offre.setRestaurer(restaurer);
        offre.setDomain(domain);
        offre.setInteresse(interesse);

        return offreService.updateOffre1(offre, idoffre);



    }
    @GetMapping("/retrieve-offre/{idoffre}")
    public Offer retrieveOffre(@PathVariable("idoffre") Integer idoffre) {
        return offreService.retrieveOffre(idoffre);
    }
    @DeleteMapping("/remove-offre/{idoffre}")
    public void removeOffre1(@PathVariable("idoffre") Integer idoffre) {
        offreService.removeOffre1(idoffre);
    }

    @DeleteMapping("/remove-offre/{idoffre}/{id}")
    public void removeOffre(@PathVariable("idoffre") Integer idoffre,@PathVariable("idoffre") Integer id) {
        offreService.removeOffre(idoffre,id);
    }


    @GetMapping("/getoffres")
    public List<Offer> getoffres(){
        return offreService.listeroffres();
    }

    @GetMapping("/findByHistorique1")
    public List<Offer> findByHistorique1() {
        return offreService.findByHistorique1();


    }
    @GetMapping("/getHistorique/{historique}")
    public ResponseEntity<List<Offer>> getOffreByHistorique(@PathVariable Boolean historique) {
        List<Offer> offres = offreService.getOffreByHistorique(historique);
        return new ResponseEntity<>(offres, HttpStatus.OK);


    }

    @GetMapping(value = "/getnboffresexist/{startDate}/{endDate}")
    List<Offer> getnboffresexist(@PathVariable(name = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                                    @PathVariable(name = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {

        return offreService.getoffresexist(startDate, endDate);
    }

    @GetMapping("findAlldto")
    public ResponseEntity<List<OfferDTO>> retrieveAllOffresdto() {
        return ResponseEntity.ok(offreService.retrieveAllOffresdto());
    }
    @GetMapping("/getoffresdto")
    public ResponseEntity<List<OfferDTO>> listeroffres() {
        return ResponseEntity.ok(offreService.listeroffresdto());
    }

    @GetMapping("/findByHistorique1dto")

    public ResponseEntity<List<OfferDTO>> findByHistorique1dto() {
            return ResponseEntity.ok(offreService.findByHistorique1dto());


    }


  /*  @GetMapping("/export/{id}")
    public ResponseEntity<Resource> exportContrat(@PathVariable int id) throws IOException {

        String filename = "Offre_" + id + ".pdf";
        String filePath = "C:/Users/DELL/Desktop/" + filename; // Update with your actual desktop path

        // Export the contract to PDF
        offreService.exportcontrat(id, filePath);

        // Prepare the file as a Resource
        File file = new File(filePath);
        Path path = file.toPath();
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        // Set the response headers
        HttpHeaders headers = new HttpHeaders();

        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);

        // Return the file as a ResponseEntity
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/pdf"))
                .body(resource);

    }*/
  @Autowired
  PDFService pdfGeneratorService;
  @GetMapping("/export/{id}")
  public void generatePDF(@PathVariable int id, HttpServletResponse response) throws IOException {
      response.setContentType("application/pdf");
      DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
      String currentDateTime = dateFormat.format(new Date());

      String headerKey = "Content-Disposition";
      String headerValue = "attachment; filename=pdf_" + currentDateTime + ".pdf";
      response.setHeader(headerKey, headerValue);

      this.pdfGeneratorService.export(id, response.getOutputStream());
  }

    @GetMapping("/offers/interesse")
    public ResponseEntity<List<OfferDTO>> getinteresseOffers() {
        return ResponseEntity.ok(offreService.getinteresseOffers());

    }



    @GetMapping("/getdomain/{domain}")
    public ResponseEntity<List<OfferDTO>> getOffreBydomain(@PathVariable Domain domain) {
        return ResponseEntity.ok(offreService.getOffreByDomain(domain));


    }

    @GetMapping(value = "/getoffresexistdto/{startDate}/{endDate}")
    public ResponseEntity<List<OfferDTO>> getoffresexist(@PathVariable(name = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                                                         @PathVariable(name = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate){
        return ResponseEntity.ok(offreService.getoffresexistdto(startDate,endDate));

       // return offreService.getoffresexist(startDate, endDate);
    }

    @PostMapping("/add")
    public Offer ajouteroffre( @RequestBody Offer employee) {
        return offreService.save(employee);
    }






    @GetMapping("/eventId/{idoffre}")
    public ResponseEntity<Offer> getEventsById(@PathVariable("idoffre") Integer idoffre) {

        Offer employee = offreService.findById(idoffre)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + idoffre));
        return ResponseEntity.ok().body(employee);

    }

    @PutMapping("/employees/{idoffre}")
    public ResponseEntity<Offer> updateEmployee(@PathVariable(value = "idoffre") int idoffre,
                                                @RequestBody Offer employeeDetails) throws ResourceNotFoundException {
        Offer events = offreService.findById(idoffre)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + idoffre));

        events.setTitre(employeeDetails.getTitre());
        events.setDescription(employeeDetails.getDescription());
        events.setDatedebut(employeeDetails.getDatedebut());
        events.setDatefin(employeeDetails.getDatefin());
        events.setDomain(employeeDetails.getDomain());
        events.setInteresse(employeeDetails.getInteresse());



        final Offer updatedEmployee = offreService.save(events);
        return ResponseEntity.ok(updatedEmployee);
    }
    @GetMapping("findAlldtoh")
    public ResponseEntity<List<OfferDTOH>> retrieveAllOffresdtoh() {
        return ResponseEntity.ok(offreService.retrieveAllOffresdtoh());
    }


}
