package se.uu.elephas.services;

import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;

import java.util.Optional;

public interface OrderService {

    Object create(Long userId);
//   Optional<Order> getByIdOrder(Long idOrder);
//   Iterable<Order> getByIdUser(Long idUser);
    Iterable<Order> getAllOrders();
    Order getUserBasket(Long userId);
    OrderItem findProductInOrder(Long orderId, Long productId);
    Object createOrderItem(Order order, Long productId);
    Object increaseQuantityOfOrderItem(OrderItem orderItem);

    //TODO: createOrder
    //TODO: updateOrder
    //TODO: deleteOrder

}