package se.uu.elephas.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import se.uu.elephas.model.CustomProduct;
import se.uu.elephas.model.UpdateCustomProduct;
import se.uu.elephas.services.CustomProductServiceImpl;
import se.uu.elephas.services.StorageServiceImpl;

import javax.validation.Valid;


@RestController
@RequestMapping("/customProduct")
@CrossOrigin("*")
public class CustomProductController {

    @Autowired
    private CustomProductServiceImpl customProductService;
    @Autowired
    private StorageServiceImpl storageService;

    @RequestMapping(value = "/create", method = {RequestMethod.POST})
    public ResponseEntity<String> create(
            @RequestBody CustomProduct product)
            throws com.fasterxml.jackson.core.JsonProcessingException {

        customProductService.create(product);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(product));

    }

    @RequestMapping(value = "/update", method = {RequestMethod.PATCH})
    public ResponseEntity<String> update(
            @RequestBody UpdateCustomProduct customProduct
    ) throws com.fasterxml.jackson.core.JsonProcessingException {

        CustomProduct updatedCustomProduct = customProductService.update(customProduct);

        if (updatedCustomProduct == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Custom product with id " + customProduct.getId() + " not found.");

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(updatedCustomProduct));

    }

    @RequestMapping(value = "/updateStatus", method = {RequestMethod.PATCH})
    public ResponseEntity<String> updateStatus(
            @RequestParam("idCustom") @Valid Long idCustom,
            @RequestParam("status") @Valid int status
    ) throws com.fasterxml.jackson.core.JsonProcessingException {

        CustomProduct customProduct = customProductService.update(idCustom, status);

        if (customProduct == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Custom product with id " + idCustom + " not found.");

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(customProduct));

    }

    @RequestMapping(value = "/customCreations", method = {RequestMethod.GET})
    public ResponseEntity<String> findCreations() throws JsonProcessingException {

        Iterable<CustomProduct> productCreations = customProductService.getAllCustomCreations();

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(productCreations));
    }

    @RequestMapping(value = "/creations", method = {RequestMethod.GET})
    public ResponseEntity<String> findCreations(
            @RequestParam("idUser") @Valid Long idUser
    ) throws JsonProcessingException {

        Iterable<CustomProduct> productCreations = customProductService.getCreationsByUser(idUser);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(productCreations));
    }

    @RequestMapping(value = "/orders", method = {RequestMethod.GET})
    public ResponseEntity<Integer> findUncompletedOrders() {

        int counter = customProductService.getAllUncompletedOrderSize();

        return ResponseEntity.status(HttpStatus.OK).body(counter);
    }


    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping("/uploadImage")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
            RedirectAttributes redirectAttributes) {

        storageService.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

        return "redirect:/";
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }






}
