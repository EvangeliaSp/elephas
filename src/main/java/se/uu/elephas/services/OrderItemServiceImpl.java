package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.uu.elephas.model.BasketItem;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;
import se.uu.elephas.repository.OrderItemRepository;
import se.uu.elephas.repository.OrderRepository;

import java.util.ArrayList;
import java.util.List;
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

    public OrderItem findItemInOrderItems(Long idOrder, Long idItem) {

        Iterable<OrderItem> orderItems = this.getOrderItems(idOrder);

        for (OrderItem orderItem: orderItems) {
            if (orderItem.getIdOrderItem().longValue() == idItem.longValue())
                return orderItem;
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
        }

        return null;

    }

    public OrderItem decreaseOrderItemQuantity(Long idOrder, Long idItem) {

        Optional<OrderItem> orderItemOptional = orderItemRepository.findById(idItem);

        if (orderItemOptional.isPresent()) {

            OrderItem orderItem = orderItemOptional.get();

            orderItem.setQuantity(orderItem.getQuantity()-1);

            if (orderItem.getQuantity() == 0) {
                orderItemRepository.deleteById(idItem);
                return null;
            }

            orderItemRepository.save(orderItem);

            return orderItem;

        }

        return null;

    }

    public void delete(Long idOrderItem) {
        orderItemRepository.deleteById(idOrderItem);
    }

    public List<BasketItem> getCartOrderItems(Long idOrder) {

        Iterable<OrderItem> orderItems = this.getOrderItems(idOrder);

        List<BasketItem> basketItems = new ArrayList<>();

        for (OrderItem orderItem: orderItems) {
            Long idProduct = orderItem.getProduct().getIdProduct();
            if (!this.existBasketItem(idProduct, basketItems)) {
                BasketItem basketItem = new BasketItem(
                        orderItem.getIdOrderItem(),
                        orderItem.getProduct().getIdProduct(),
                        orderItem.getProduct().getName(),
                        orderItem.getProduct().getUrl(),
                        orderItem.getQuantity(),
                        orderItem.getProduct().getPrice(),
                        orderItem.getProduct().getDiscount());
                basketItems.add(basketItem);
            } else {
                for (BasketItem basketItem: basketItems) {
                    if (idProduct == basketItem.getIdProduct())
                        basketItem.setQuantity(basketItem.getQuantity()+1);
                }
            }
        }

        return basketItems;

    }

    private boolean existBasketItem(Long idProduct, List<BasketItem> basketItems) {
        for (BasketItem basketItem: basketItems) {
            if (idProduct == basketItem.getIdProduct())
                return true;
        }
        return false;
    }

}
