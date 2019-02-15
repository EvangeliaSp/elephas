package se.uu.elephas.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.uu.elephas.model.Order;
import se.uu.elephas.services.OrderServiceImpl;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderService;

    
    @RequestMapping(value = "/findByIdOrder", method = {RequestMethod.GET})
    public ResponseEntity<String> findByIdOrder(
            @RequestParam("idOrder") @Valid Long idOrder)
            throws JsonProcessingException {

        Optional<Order> order = orderService.getByIdOrder(idOrder);

        return order.isPresent()
                ? ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(order.get()))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order with id " + idOrder + " does not exist.");

    }

    @RequestMapping(value = "/findByIdUser", method = {RequestMethod.GET})
    public ResponseEntity<String> findByIdUser(
            @RequestParam("idUser") @Valid Long idUser)
            throws JsonProcessingException {
                
        //TODO: it's something wrong with this. Maybe have alook at the return types, Pageable/Iterable
        Iterable<Order> orders = orderService.getByIdUser(idUser);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));

    }

    @RequestMapping(value = "all", method = {RequestMethod.GET})
    public ResponseEntity<String> findAll()
            throws JsonProcessingException {

        Iterable<Order> orders = orderService.getAllOrders();

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));
    }
}