package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;
import se.uu.elephas.repository.OrderItemRepository;
import se.uu.elephas.repository.OrderRepository;

import java.util.Optional;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;


    public Iterable<OrderItem> getOrderItems(Long idOrder) {

        Optional<Order> optionalOrder = orderRepository.findByIdOrder(idOrder);

        if (optionalOrder.isPresent()) {

            Order order = optionalOrder.get();

            return orderItemRepository.findBySourceOrder(order);

        }

        return null;
    }

    public OrderItem increaseOrderItemQuantity(Long idOrder, Long idItem) {

        Optional<OrderItem> orderItemOptional = orderItemRepository.findById(idItem);

        if (orderItemOptional.isPresent()) {

            OrderItem orderItem = orderItemOptional.get();

            orderItem.setQuantity(orderItem.getQuantity()+1);

            orderItemRepository.save(orderItem);

            return orderItem;

//            if (orderItem.getQuantity() == 0)
//                orderItemRepository.deleteById(idItem);
        }

        return null;

    }

    public void delete(Long idOrderItem) {
        orderItemRepository.deleteById(idOrderItem);
    }
}
