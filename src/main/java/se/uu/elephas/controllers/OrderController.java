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

    @RequestMapping(value = "showBasket", method = {RequestMethod.GET})
    public ResponseEntity<String> showBasket(
            @RequestParam("idUser") @Valid Long idUser)
            throws JsonProcessingException {

        Iterable<Order> orders = orderService.getBasketOfUser(idUser);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));
    }

    @RequestMapping(value = "userOrders", method = {RequestMethod.GET})
    public ResponseEntity<String> findUserOrdersAll(
            @RequestParam("idUser") @Valid Long idUser)
            throws JsonProcessingException {

        Iterable<Order> orders = orderService.getOrdersByUser(idUser);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));
    }

    @RequestMapping(value = "all", method = {RequestMethod.GET})
    public ResponseEntity<String> findAll()
            throws JsonProcessingException {

        Iterable<Order> orders = orderService.getAllOrders();

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));
    }

    @RequestMapping(value = "proceed", method = {RequestMethod.PATCH})
    public ResponseEntity<String> proceed(
            @RequestParam("idUser") @Valid Long idUser)
            throws JsonProcessingException {

        Order order = orderService.proceedOrder(idUser);
        if (order == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot proceed basket to order. User with id " + idUser + " not found.");

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(order));

    }

    @RequestMapping(value = "findOrderItems", method = {RequestMethod.GET})
    public ResponseEntity<String> findOrderItems(
            @RequestParam("idOrder") @Valid Long idOrder)
            throws JsonProcessingException {

        Iterable<OrderItem> orderItems = orderService.getOrderItems(idOrder);
        if (orderItems == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found order with id " + idOrder);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orderItems));

    }

}