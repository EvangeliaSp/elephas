package se.uu.elephas.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.uu.elephas.model.Product;
import se.uu.elephas.services.ProductServiceimpl;

import javax.validation.Valid;
import java.util.Optional;


@RestController
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductServiceimpl productService;
    private boolean required;

    @RequestMapping(value = "/create", method = {RequestMethod.POST})
    public ResponseEntity<String> create(@RequestBody Product product)  throws com.fasterxml.jackson.core.JsonProcessingException {

            productService.create(product);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(product));

    }

    @RequestMapping(value = "/findById", method = {RequestMethod.GET})
    public ResponseEntity<String> findById(
            @RequestParam("idProduct") @Valid Long idProduct)
            throws JsonProcessingException {

        Optional<Product> product = productService.getById(idProduct);

        return product.isPresent()
                ? ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(product.get()))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product with id " + idProduct + " does not exist.");

    }

//    @RequestMapping(value = "all", method = {RequestMethod.GET})
//    public ResponseEntity<String> findAll()
//            throws JsonProcessingException {
//
//        Iterable<Product> products = productService.getAll();
//
//        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(products));
//    }

    @RequestMapping(value = "/findBy", method = {RequestMethod.GET})
    public ResponseEntity<String> findByFilter(
            @RequestParam(required = false) @Valid Integer type,
            @RequestParam(required = false) @Valid Integer material,
            @RequestParam(required = false) @Valid Integer color)
            throws JsonProcessingException {

        Iterable<Product> products = productService.getByParam(type, material, color);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(products));


    }
}
