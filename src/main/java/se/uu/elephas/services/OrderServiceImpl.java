package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.uu.elephas.model.Order;
import se.uu.elephas.model.User;
import se.uu.elephas.repository.OrderRepository;
import se.uu.elephas.repository.UserRepository;

import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    public OrderServiceImpl() {}

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Object create(Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();
            Order order = new Order(user, false, 0);
            return orderRepository.save(order);

        }

        return null;

    }

//    public Optional<Order> getByIdOrder(Long idOrder) {
//        return(orderRepository.findByIdOrder(idOrder));
//    }
//
//    public Iterable<Order> getOrdersByIdUser(Long userId) {
//
//        Optional<User> optionalUser = userRepository.findById(userId);
//
//        if (optionalUser.isPresent()) {
//
//            User user = optionalUser.get();
//            return orderRepository.findOrdersByUser(user);
//        }
//
//        return null;
//
//    }

    public Iterable<Order> getAllOrders() {
        return orderRepository.findAll();

    }
}