package se.uu.elephas.services;

import se.uu.elephas.model.Order;

import java.util.Optional;

public interface OrderService {

    Object create(Long userId);
//   Optional<Order> getByIdOrder(Long idOrder);
//   Iterable<Order> getByIdUser(Long idUser);


    Iterable<Order> getBasketOfUser(Long idUser);

    Iterable<Order> getOrdersByUser(Long userId);

    Iterable<Order> getAllOrders();


    //TODO: updateOrder
    //TODO: deleteOrder

}