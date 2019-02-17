package se.uu.elephas.services;

import se.uu.elephas.model.Order;

import java.util.Optional;

public interface OrderService {

    Object create(Long userId);
//   Optional<Order> getByIdOrder(Long idOrder);
//   Iterable<Order> getByIdUser(Long idUser);
   Iterable<Order> getAllOrders();

    //TODO: createOrder
    //TODO: updateOrder
    //TODO: deleteOrder

}