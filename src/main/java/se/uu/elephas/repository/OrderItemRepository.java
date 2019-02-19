package se.uu.elephas.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;

@Repository
public interface OrderItemRepository extends CrudRepository<OrderItem, Long> {

    Iterable<OrderItem> findBySourceOrder(Order order);

}
