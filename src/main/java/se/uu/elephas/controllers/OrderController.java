package se.uu.elephas.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.uu.elephas.model.BasketItem;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;
import se.uu.elephas.services.OrderItemServiceImpl;
import se.uu.elephas.services.OrderServiceImpl;

import javax.validation.Valid;
import java.util.List;
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

    @RequestMapping(value = "/showBasket", method = {RequestMethod.GET})
    public ResponseEntity<String> showBasket(
            @RequestParam("idUser") @Valid Long idUser)
            throws JsonProcessingException {

        Iterable<Order> orders = orderService.getBasketOfUser(idUser);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));
    }

    @RequestMapping(value = "/userOrders", method = {RequestMethod.GET})
    public ResponseEntity<String> findUserOrdersAll(
            @RequestParam("idUser") @Valid Long idUser)
            throws JsonProcessingException {

        Iterable<Order> orders = orderService.getOrdersByUser(idUser);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));
    }

    @RequestMapping(value = "/addToBasket", method = {RequestMethod.POST})
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

        if (orderService.increaseOrderSum(basket, item.getProduct().getPrice(), item.getProduct().getDiscount()) == null)
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Not changed the total sum of the basket-order, adding the product with id " + idProduct);

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

            if ((basket = orderService.decreaseOrderSumWhenRemove(basket, item)) == null)
                return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Not changed the total sum of the basket-order, removing the product with id " + idOrderItem);

            return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(basket));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot remove order item with id " + idOrderItem + ". It is not found.");
        }
    }


    @RequestMapping(value = "/all", method = {RequestMethod.GET})
    public ResponseEntity<String> findAll()
            throws JsonProcessingException {

        Iterable<Order> orders = orderService.getAllOrders();

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));
    }

    @RequestMapping(value = "/proceed", method = {RequestMethod.PATCH})
    public ResponseEntity<String> proceed(
            @RequestParam("idUser") @Valid Long idUser)
            throws JsonProcessingException {

        Order order = orderService.proceedOrder(idUser);
        Order basket = (Order) orderService.create(idUser);
        if (order == null || basket == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot proceed basket to order. User with id " + idUser + " not found.");

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(order));

    }

    @RequestMapping(value = "/findOrderItems", method = {RequestMethod.GET})
    public ResponseEntity<String> findOrderItems(
            @RequestParam("idOrder") @Valid Long idOrder)
            throws JsonProcessingException {

        Iterable<OrderItem> orderItems = orderItemService.getOrderItems(idOrder);

        if (orderItems == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found order with id " + idOrder);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orderItems));

    }

    @RequestMapping(value = "/increase", method = {RequestMethod.PATCH})
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

        if (orderService.increaseOrderSum(basket, orderItem.getProduct().getPrice(), orderItem.getProduct().getDiscount()) == null)
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Not changed the total sum of the basket-order, adding the item with id " + idItem);

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orderItem));

    }

    @RequestMapping(value = "/decrease", method = {RequestMethod.PATCH})
    public ResponseEntity<String> decreaseQuantity(
            @RequestParam("idUser") @Valid Long idUser,
            @RequestParam("idItem") @Valid Long idItem)
            throws JsonProcessingException {

        Order basket = orderService.getBasketOfUser(idUser).iterator().next();
        if (basket == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find basket. User with id " + idUser + " not found.");

        OrderItem orderItem = orderItemService.findItemInOrderItems(basket.getIdOrder(), idItem);

        if (orderItem == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find item with id " + idItem + ".");
        }
        if (orderService.decreaseOrderSum(basket, orderItem.getProduct().getPrice(), orderItem.getProduct().getDiscount()) == null)
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Not changed the total sum of the basket-order, removing the item with id " + idItem);

        orderItem = orderItemService.decreaseOrderItemQuantity(basket.getIdOrder(), idItem);

        if (orderItem != null) {
            return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orderItem));
        }

        return ResponseEntity.status(HttpStatus.OK).body("Order item with id " + idItem + " removed from basket.");

    }

    @RequestMapping(value = "/showBasketItems", method = {RequestMethod.GET})
    public ResponseEntity<String> showBasketItems(
            @RequestParam("idUser") @Valid Long idUser)
            throws JsonProcessingException {

        Order basket = orderService.getBasketOfUser(idUser).iterator().next();

        if (basket == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Basket of user with id " + idUser + " not found.");

        List<BasketItem> basketItems = orderItemService.getCartOrderItems(basket.getIdOrder());

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(basketItems));

        }

    @RequestMapping(value = "/total/{idUser}", method = {RequestMethod.GET})
    public ResponseEntity<String> getTotal(
            @PathVariable("idUser") @Valid Long idUser)
            throws JsonProcessingException {

        Order basket = orderService.getBasketOfUser(idUser).iterator().next();

        if (basket == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Basket of user with id " + idUser + " not found.");

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(basket.getSum()));
    }

    @RequestMapping(value = "/cartSize/{idUser}", method = {RequestMethod.GET})
    public ResponseEntity<Integer> getCartSize(
            @PathVariable("idUser") @Valid Long idUser) {

        int sizeC = orderService.sizeCart(idUser);
        return ResponseEntity.status(HttpStatus.OK).body(sizeC);

    }

    @RequestMapping(value = "/inProgressOrders", method = {RequestMethod.GET})
    public ResponseEntity<String> findInProgressOrders()
            throws JsonProcessingException {

        Iterable<Order> orders = orderService.getPendingOrders();

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(orders));
    }

    @RequestMapping(value = "/approve", method = {RequestMethod.PATCH})
    public ResponseEntity<String> approveOrder(
            @RequestParam("idOrder") @Valid Long idOrder)
            throws JsonProcessingException {

        Order order = orderService.approveInProgressOrder(idOrder);

        if (order == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order with id " + idOrder + " not found.");

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(order));
    }

    @RequestMapping(value = "/decline", method = {RequestMethod.PATCH})
    public ResponseEntity<String> declineOrder(
            @RequestParam("idOrder") @Valid Long idOrder
    ) throws JsonProcessingException {

        Order order = orderService.declineInProgressOrder(idOrder);

        if (order == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order with id " + idOrder + " not found.");

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(order));
    }

    @RequestMapping(value = "/inProgressOrdersSize", method = {RequestMethod.GET})
    public ResponseEntity<Integer> findInProgressOrdersSize() {

        int ordersSize = orderService.getPendingOrdersSize();

        return ResponseEntity.status(HttpStatus.OK).body(ordersSize);
    }

    @RequestMapping(value = "/orderItemsSizeByType", method = {RequestMethod.GET})
    public ResponseEntity<Integer> findOrderItemsSizeByType(
            @RequestParam("type") @Valid Integer type
    ) {

        int counter = orderService.getOrderItemsByType(type);

        return ResponseEntity.status(HttpStatus.OK).body(counter);
    }

    @RequestMapping(value = "/ordersSize", method = {RequestMethod.GET})
    public ResponseEntity<Integer> getOrdersSizeByStatus(
            @RequestParam("status") @Valid Integer status
    ) {

        int counter = orderService.getSizeOfOrdersByStatus(status);

        return ResponseEntity.status(HttpStatus.OK).body(counter);
    }

}