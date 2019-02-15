package se.uu.elephas.services;

import se.uu.elephas.model.Order;

import java.security.MessageDigest;
import java.util.List;
import java.util.Optional;

public interface OrderService {

   Optional<Order> getByIdOrder(Long idOrder);
   Iterable<Order> getByIdUser(Long idUser);
   Iterable<Order> getAllOrders();

    //TODO: createOrder
    //TODO: updateOrder
    //TODO: deleteOrder

}