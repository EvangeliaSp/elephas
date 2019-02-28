package se.uu.elephas.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;
import se.uu.elephas.services.OrderItemServiceImpl;
import se.uu.elephas.services.OrderServiceImpl;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private OrderItemServiceImpl orderItemService;


    @RequestMapping(value = "/create", method = {RequestMethod.POST})
    public ResponseEntity<String> create(
            @RequestParam("userId") @Valid Long userId)
            throws JsonProcessingException {


        Order order = (Order) orderService.create(userId);
        if (order == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot create order. User with id " + userId + " not found.");

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(order));

    }

    @RequestMapping(value = "/findByIdOrder", method = {RequestMethod.GET})
    public ResponseEntity<String> findOrder(
            @RequestParam("idOrder") @Valid Long idOrder)
            throws JsonProcessingException {

        Optional<Order> order = orderService.getOrder(idOrder);

        return order.isPresent()
                ? ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(order.get()))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order with id " + idOrder + " does not exist.");

    }

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

    @RequestMapping(value = "addToBasket", method = {RequestMethod.POST})
    public ResponseEntity<String> addToBasket(
            @RequestParam("idUser") @Valid Long idUser,
            @RequestParam("productId") @Valid Long idProduct)
            throws JsonProcessingException {

        Order basket = orderService.getBasketOfUser(idUser).iterator().next(); // assuming a user only has one basket

        if (basket == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot create basket. User with id " + idUser + " not found.");

        OrderItem item = orderService.findProductInOrder(basket.getIdOrder(), idProduct);
        if (item == null) {
            // add orderItem to basket
            item = (OrderItem) orderService.createOrderItem(basket, idProduct);
            if (item == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot create orderItem.");
        } else {
            // increase quantity of orderItem
            item = orderItemService.increaseOrderItemQuantity(basket.getIdOrder(), item.getIdOrderItem());
            if (item == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot increase quantity of orderItem.");
        }


        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(item));
    }

    @RequestMapping(value = "/removeFromBasket", method = {RequestMethod.DELETE})
    public ResponseEntity<String> removeFromBasket(
            @RequestParam("idUser") @Valid Long idUser,
            @RequestParam("idOrderItem") @Valid Long idOrderItem)
            throws JsonProcessingException {

        Order basket = orderService.getBasketOfUser(idUser).iterator().next();
        if (basket == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find basket. User with id " + idUser + " not found.");

        OrderItem item = orderItemService.findItemInOrderItems(basket.getIdOrder(), idOrderItem);

        if (item != null) {
            orderItemService.delete(idOrderItem);
            basket = orderService.getBasketOfUser(idUser).iterator().next();
            return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(basket));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot remove order item with id " + idOrderItem + ". It is not found.");
        }
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

        Iterable<OrderItem> orderItems = orderItemService.getOrderItems(idOrder);

        if (orderItems == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found order with id " + idOrder);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orderItems));

    }

    @RequestMapping(value = "increase", method = {RequestMethod.PATCH})
    public ResponseEntity<String> increaseQuantity(
            @RequestParam("idUser") @Valid Long idUser,
            @RequestParam("idItem") @Valid Long idItem)
            throws JsonProcessingException {

        Order basket = orderService.getBasketOfUser(idUser).iterator().next();
        if (basket == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find basket. User with id " + idUser + " not found.");


        OrderItem orderItem = orderItemService.increaseOrderItemQuantity(basket.getIdOrder(), idItem);

        if (orderItem == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found order item with id " + idItem);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orderItem));

    }

    @RequestMapping(value = "decrease", method = {RequestMethod.PATCH})
    public ResponseEntity<String> decreaseQuantity(
            @RequestParam("idUser") @Valid Long idUser,
            @RequestParam("idItem") @Valid Long idItem)
            throws JsonProcessingException {

        Order basket = orderService.getBasketOfUser(idUser).iterator().next();
        if (basket == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find basket. User with id " + idUser + " not found.");


        OrderItem orderItem = orderItemService.decreaseOrderItemQuantity(basket.getIdOrder(), idItem);

        if (orderItem != null)
            return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orderItem));

        return ResponseEntity.status(HttpStatus.OK).body("Order item with id " + idItem + " removed from basket.");

    }

}