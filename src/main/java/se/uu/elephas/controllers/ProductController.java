//package se.uu.elephas.controllers;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import se.uu.elephas.model.Product;
//import se.uu.elephas.services.ProductServiceimpl;
//
//
//
//@RestController
//@RequestMapping("/product")
//@CrossOrigin("*")
//public class ProductController {
//
//    @Autowired
//    private ProductServiceimpl productService;
//
//    @RequestMapping(value = "/create", method = {RequestMethod.POST})
//    public ResponseEntity<String> create(@RequestBody Product product)  throws com.fasterxml.jackson.core.JsonProcessingException {
//
//            productService.create(product);
//
//        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(product));
//
//    }
//
//}
