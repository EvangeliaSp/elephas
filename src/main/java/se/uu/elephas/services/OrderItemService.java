package se.uu.elephas.services;

import se.uu.elephas.model.OrderItem;

public interface OrderItemService {

    Iterable<OrderItem> getOrderItems(Long idOrder);

    Iterable<OrderItem> increaseOrderItemQuantity(Long idOrder, Long idItem);

    void delete (Long idOrderItem);

}
