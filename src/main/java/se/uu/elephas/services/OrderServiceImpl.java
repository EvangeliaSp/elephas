package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.uu.elephas.model.Order;
import se.uu.elephas.repository.OrderRepository;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service//("orderService")
//@Transactional
public class OrderServiceImpl implements OrderService {

    public OrderServiceImpl() {}

    @Autowired
    private OrderRepository orderRepository;

    public Optional<Order> getByIdOrder(Long idOrder) {
        return(orderRepository.findByIdOrder(idOrder));
    }

    public Iterable<Order> getByIdUser(Long idUser) {
        return orderRepository.findByIdUser(idUser);
    }

    public Iterable<Order> getAllOrders() {
        return orderRepository.findAll();
        
    }
}