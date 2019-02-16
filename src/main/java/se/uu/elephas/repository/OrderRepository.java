package se.uu.elephas.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.uu.elephas.model.Order;

import java.util.Optional;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    //TODO: is this methods supposed to return 'Optional'?
    /* Return all orders for a user */
//    Page<Order> findByIdUser(Long idUser);
//
//    Page<Order> findByIdUserAndConfirm(Long idUser, Integer confirm);
//
//    /* Returns one order */
//    Optional<Order> findByIdOrder(Long idOrder);

    /* Returns all orders */
    Page<Order> findAll(Pageable pageable);

    Iterable<Order> findOrdersByUser
    // TODO: addToBasket
}