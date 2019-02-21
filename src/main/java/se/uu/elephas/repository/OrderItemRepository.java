package se.uu.elephas.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;
import se.uu.elephas.model.Order;

import java.util.Optional;

@Repository
public interface OrderItemRepository extends CrudRepository<OrderItem, Long> {

    @Override
    Optional<OrderItem> findById(Long idOrderItem);

    Iterable<OrderItem> findBySourceOrder(Order order);

}
