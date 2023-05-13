package com.example.intermove.Controllers.Accomodation;

import com.example.intermove.Entities.Accomodation.ChargeRequest;
import com.example.intermove.Entities.Accomodation.House;
import com.example.intermove.Entities.Accomodation.Image;
import com.example.intermove.Entities.Accomodation.TypeHouses;
import com.example.intermove.Repositories.Accomodation.ImageRepository;
import com.example.intermove.Services.Accomodation.IAccomodationService;
import com.example.intermove.Services.Accomodation.StripeService;
import com.example.intermove.Util.ImageUtility;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.websocket.server.PathParam;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Tag(name = "Houses Management")
@RestController
@RequestMapping("/Houses")
public class HouseController {
    @Autowired
    IAccomodationService accomodationService;
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    private StripeService paymentsService;

    @Value("${stripe.public.key}")
    private String stripePublicKey;

    @GetMapping("/AllHouses")
    @ResponseBody
    public List<House> getAllHouses() {
        return accomodationService.getAllHouses();
    }

    @PostMapping("/addHouse/{idAgency}")
    @ResponseBody
    public int addAgent(@RequestBody House house, @PathVariable("idAgency") int id) {

        return accomodationService.addHouses(house, id);
    }


    @PutMapping("/updateHouse")
    @ResponseBody
    public House updateHouse(@RequestBody House house) {
        return accomodationService.updateHouses(house);
    }


    @DeleteMapping("/deleteHouse/{id}")
    @ResponseBody
    public void deleteAgency(@PathVariable("id") int id) {
        accomodationService.deleteHouse(id);
    }

    @GetMapping("/getHouseById/{id}")
    @ResponseBody
    public House getHouseById(@PathVariable("id") int id) {
        return accomodationService.getHouseById(id);
    }

    @GetMapping(value = {"/SearchHouse"})
    @ResponseBody
    public List<House> findHouse(@RequestParam(required = false) String country,@RequestParam(required = false) String region
            ,@RequestParam(required = false) Boolean available
            ,@RequestParam(required = false) TypeHouses typeHouses
            ,@RequestParam(required = false) Integer Loyer){
        return accomodationService.findByCountryAndRegion(country,region,available,typeHouses,Loyer);
    }
    @PostMapping("/upload/image/{idh}")
    public ResponseEntity<ImageUploadResponse> uploadImage(@RequestParam("image") MultipartFile file,@PathVariable("idh") int id)
            throws IOException {
        House house = accomodationService.getHouseById(id);
        Image image = imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(ImageUtility.compressImage(file.getBytes())).build());

        image.setHouse(house);
        imageRepository.save(image);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageUploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename() ));
    }
    @GetMapping(path = {"/get/image/info/{name}"})
    public Image getImageDetails(@PathVariable("name") String name) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByName(name);

        return Image.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(ImageUtility.decompressImage(dbImage.get().getImage())).build();
    }
    @GetMapping(path = {"/get/image/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByName(name);


        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }
    @GetMapping(path = {"/get/houseimage/{idh}"})
    public List<Image> getImageByHouse(@PathVariable("idh") int id) throws IOException {
        House house =getHouseById(id);
        return house.getImages();
    }
    @GetMapping(path = {"/get/housethumb/{idh}"})
    public ResponseEntity<byte[]> getImageThumb(@PathVariable("idh") int id) throws IOException {
        House house =getHouseById(id);

        final Optional<Image> dbImage = Optional.ofNullable(house.getImages().get(0));


        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }
    /*
    @PostMapping("/charge")
    public String charge(ChargeRequest chargeRequest, Model model)
            throws StripeException {
        chargeRequest.setDescription("Example charge");
        chargeRequest.setCurrency(ChargeRequest.Currency.EUR);
        Charge charge = paymentsService.charge(chargeRequest);
        model.addAttribute("id", charge.getId());
        model.addAttribute("status", charge.getStatus());
        model.addAttribute("chargeId", charge.getId());
        model.addAttribute("balance_transaction", charge.getBalanceTransaction());
        return "result";
    }

    @ExceptionHandler(StripeException.class)
    public String handleError(Model model, StripeException ex) {
        model.addAttribute("error", ex.getMessage());
        return "result";
    }



    @RequestMapping("/checkout")
    public String checkout(Model model) {
        model.addAttribute("amount", 50 * 100); // in cents
        model.addAttribute("stripePublicKey", stripePublicKey);
        model.addAttribute("currency", ChargeRequest.Currency.EUR);
        return "checkout";
    }
    */

}
