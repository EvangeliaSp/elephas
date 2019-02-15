package se.uu.elephas.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import se.uu.elephas.model.Order;

import java.util.Optional;

@Repository
//@Transactional
public interface OrderRepository extends CrudRepository<Order, Long> {

    //TODO: is this methods supposed to return 'Optional'?
    /* Return all orders for a user */
    Page<Order> findByIdUser(Long idUser);

    /* Returns one order */
    Optional<Order> findByIdOrder(Long idOrder);

    /* Returns all orders */
    Page<Order> findAll(Pageable pageable);
   
    // TODO: addToBasket
}