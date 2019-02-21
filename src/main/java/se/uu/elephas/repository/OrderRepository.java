package se.uu.elephas.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.User;

import java.util.Optional;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    Optional<Order> findByIdOrder(Long idOrder);

    Iterable<Order> findByOrderUserAndConfirm(User user, Boolean confirm);

    /* Returns all orders */
    Page<Order> findAll(Pageable pageable);

}