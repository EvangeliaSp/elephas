package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;
import se.uu.elephas.model.User;
import se.uu.elephas.model.Product;
import se.uu.elephas.repository.OrderRepository;
import se.uu.elephas.repository.ProductRepository;
import se.uu.elephas.repository.OrderItemRepository;
import se.uu.elephas.repository.UserRepository;


import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    public OrderServiceImpl() {}

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired ProductRepository productRepository;

    public Object create(Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();
            Order order = new Order(user, false, 0);
            return orderRepository.save(order);

        }

        return null;

    }

    public Object createOrderItem(Order order, Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        
        if (optionalProduct.isPresent()) {

            Product product = optionalProduct.get();
            OrderItem orderItem = new OrderItem(order, product);
            return orderItemRepository.save(orderItem);
        }

        return null;
    }


    public OrderItem findProductInOrder(Long orderId, Long productId) {
        Iterable<OrderItem> orderItems = getOrderItemsByOrderId(orderId);
        if (orderItems != null) {
            for (OrderItem orderItem : orderItems) {
                if (orderItem.getProduct().getIdProduct() == productId)
                return orderItem;
            }
        }
        return null;
    }

    private Iterable<OrderItem> getOrderItemsByOrderId(Long orderId) {

        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            Iterable<OrderItem> orderItems = orderItemRepository.findBySourceOrder(order);
            return orderItems;
        }
       return null;
    }

//    public Optional<Order> getByIdOrder(Long idOrder) {
//        return(orderRepository.findByIdOrder(idOrder));
//    }

    public Iterable<Order> getBasketOfUser(Long idUser) {

        Optional<User> optionalUser = userRepository.findById(idUser);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();
            return orderRepository.findByOrderUserAndConfirm(user, false);
        }

        return null;
    }

    public Iterable<Order> getOrdersByUser(Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();
            return orderRepository.findByOrderUserAndConfirm(user, true);
        }

        return null;

    }

    public Iterable<Order> getAllOrders() {
        return orderRepository.findAll();

    }


    public Object increaseQuantityOfOrderItem(OrderItem orderItem) {
        int currentQuantity = orderItem.getQuantity();
        orderItem.setQuantity(currentQuantity + 1);
        return orderItemRepository.save(orderItem);
    }

    public Order proceedOrder(Long idUser) {

        Optional<User> optionalUser = userRepository.findById(idUser);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();
            Order order = orderRepository.findByOrderUserAndConfirm(user, false).iterator().next();
            order.setConfirm(true);
            orderRepository.save(order);
            return order;
        }

        return null;

    }
}