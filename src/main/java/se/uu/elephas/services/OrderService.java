package se.uu.elephas.services;

import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;

import java.util.Optional;

public interface OrderService {

    Object create(Long userId);

    Optional<Order> getOrder(Long idOrder);

    Iterable<Order> getBasketOfUser(Long idUser);

    Iterable<Order> getOrdersByUser(Long userId);

    Iterable<Order> getAllOrders();

    Order proceedOrder(Long idUser);

    OrderItem findProductInOrder(Long orderId, Long productId);
    
    Object createOrderItem(Order order, Long productId);

    int sizeCart(Long idOrder);

    Order increaseOrderSum(Order order, float price, float discount);

    Order decreaseOrderSum(Order basket, float price, float discount);

    Order decreaseOrderSumWhenRemove(Order basket, OrderItem orderItem);

    Iterable<Order> getPendingOrders();

    Order approveInProgressOrder(Long idOrder);

    Order declineInProgressOrder(Long idOrder);

}