package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.OrderItem;
import se.uu.elephas.model.Product;
import se.uu.elephas.model.User;
import se.uu.elephas.repository.OrderItemRepository;
import se.uu.elephas.repository.OrderRepository;
import se.uu.elephas.repository.ProductRepository;
import se.uu.elephas.repository.UserRepository;

import java.sql.Timestamp;
import java.util.Optional;

import static se.uu.elephas.model.Status.*;

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
                if (orderItem.getProduct().getIdProduct().longValue() == productId.longValue())
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


    public Optional<Order> getOrder(Long idOrder) {
        return orderRepository.findById(idOrder);
    }

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


    public Order proceedOrder(Long idUser) {

        Optional<User> optionalUser = userRepository.findById(idUser);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();
            Order order = orderRepository.findByOrderUserAndConfirm(user, false).iterator().next();
            order.setConfirm(true);
            order.setStatus(IN_PROGRESS); // status 4 = IN_PROGRESS
            Timestamp currentTime = new Timestamp(System.currentTimeMillis());
            order.setDate(currentTime);
            orderRepository.save(order);
            return order;
        }

        return null;

    }

    public int sizeCart(Long idUser){
        Order basket=getBasketOfUser(idUser).iterator().next();
        Iterable<OrderItem> cart =getOrderItemsByOrderId(basket.getIdOrder());
        int mycounter=0;
        for (OrderItem item:cart){
            mycounter = mycounter + 1*item.getQuantity();
        }
        return mycounter;
    }

    public Order increaseOrderSum(Order basket, float price, float discount) {
        basket.setSum(basket.getSum() + (price - price*discount/100));
        return orderRepository.save(basket);
    }

    public Order decreaseOrderSum(Order basket, float price, float discount) {
        basket.setSum(basket.getSum() - (price - price*discount/100));
        return orderRepository.save(basket);
    }

    public Order decreaseOrderSumWhenRemove(Order basket, OrderItem orderItem) {
        basket.setSum(basket.getSum() - orderItem.getQuantity()*(orderItem.getProduct().getPrice()-orderItem.getProduct().getPrice()*orderItem.getProduct().getDiscount()/100));
        return orderRepository.save(basket);
    }

    public Iterable<Order> getPendingOrders() {
        return orderRepository.findByConfirmAndStatus(true, IN_PROGRESS.getValue());
    }

    public Order approveInProgressOrder(Long idOrder) {
        Optional<Order> optionalOrder = orderRepository.findByIdOrder(idOrder);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(COMPLETED);
            orderRepository.save(order);
            return order;
        }

        return null;
    }

    public Order declineInProgressOrder(Long idOrder) {
        Optional<Order> optionalOrder = orderRepository.findByIdOrder(idOrder);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(CANCELLED);
            orderRepository.save(order);
            return order;
        }

        return null;
    }
}