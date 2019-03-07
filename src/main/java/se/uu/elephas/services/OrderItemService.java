package se.uu.elephas.services;

import se.uu.elephas.model.BasketItem;
import se.uu.elephas.model.OrderItem;

import java.util.List;
public interface OrderItemService {

    Iterable<OrderItem> getOrderItems(Long idOrder);

    OrderItem findItemInOrderItems(Long idOrder, Long idItem);

    OrderItem increaseOrderItemQuantity(Long idOrder, Long idItem);

    OrderItem decreaseOrderItemQuantity(Long idOrder, Long idItem);

    void delete (Long idOrderItem);

    List<BasketItem> getCartOrderItems(Long idOrder);

    int getTotalCost(Long idOrder);

}
