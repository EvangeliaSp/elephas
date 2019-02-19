package se.uu.elephas.services;

import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;

import java.util.Optional;

public interface OrderService {

    Object create(Long userId);
//   Optional<Order> getByIdOrder(Long idOrder);
//   Iterable<Order> getByIdUser(Long idUser);

    Iterable<Order> getBasketOfUser(Long idUser);

    Iterable<Order> getOrdersByUser(Long userId);

    Iterable<Order> getAllOrders();

    Order proceedOrder(Long idUser);

    OrderItem findProductInOrder(Long orderId, Long productId);
    Object createOrderItem(Order order, Long productId);
    Object increaseQuantityOfOrderItem(OrderItem orderItem);

    //TODO: updateOrder
    //TODO: deleteOrder

}