package se.uu.elephas.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;
import se.uu.elephas.services.OrderServiceImpl;

import javax.validation.Valid;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderService;

    @RequestMapping(value = "/create", method = {RequestMethod.POST})
    public ResponseEntity<String> create(
            @RequestParam("userId") @Valid Long userId)
            throws JsonProcessingException {


        Order order = (Order) orderService.create(userId);
        if (order == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot create order. User with id " + userId + " not found.");

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(order));

    }

//    @RequestMapping(value = "/findByIdOrder", method = {RequestMethod.GET})
//    public ResponseEntity<String> findByIdOrder(
//            @RequestParam("idOrder") @Valid Long idOrder)
//            throws JsonProcessingException {
//
//        Optional<Order> order = orderService.getByIdOrder(idOrder);
//
//        return order.isPresent()
//                ? ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(order.get()))
//                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order with id " + idOrder + " does not exist.");
//
//    }


    @RequestMapping(value = "findByUser", method = {RequestMethod.GET})
    public ResponseEntity<String> findAll(
            @RequestParam("idUser") @Valid Long idUser)
            throws JsonProcessingException {

        Iterable<Order> orders = orderService.getOrdersByUser(idUser);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));
    }

    @RequestMapping(value = "addToBasket", method = {RequestMethod.POST})
    public ResponseEntity<String> addToBasket(
        @RequestParam("idUser") @Valid Long idUser,
        @RequestParam("productId") @Valid Long idProduct)
        throws JsonProcessingException {
            Order basket = orderService.getUserBasket(idUser);
            if (basket == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot create basket. User with id " + idUser + " not found.");
            //TODO: fix this when orderItem is done
            OrderItem item = orderService.findProductInOrder(basket.getIdOrder(), idProduct);
            if (item == null) {
                // add orderItem to basket
            } else {
                // increase quantity of orderItem
            }
        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(basket));
        }
    


    @RequestMapping(value = "all", method = {RequestMethod.GET})
    public ResponseEntity<String> findAll()
            throws JsonProcessingException {

        Iterable<Order> orders = orderService.getAllOrders();

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));
    }

}