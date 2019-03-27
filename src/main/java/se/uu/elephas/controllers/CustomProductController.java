package se.uu.elephas.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.uu.elephas.model.CustomProduct;
import se.uu.elephas.model.Product;
import se.uu.elephas.services.CustomProductServiceImpl;

import javax.validation.Valid;

@RestController
@RequestMapping("/customProduct")
@CrossOrigin("*")
public class CustomProductController {

    @Autowired
    private CustomProductServiceImpl customProductService;

    @RequestMapping(value = "/create", method = {RequestMethod.POST})
    public ResponseEntity<String> create(
            @RequestBody CustomProduct product)
            throws com.fasterxml.jackson.core.JsonProcessingException {

        customProductService.create(product);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(product));

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

}
