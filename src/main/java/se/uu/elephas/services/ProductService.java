package se.uu.elephas.services;

import se.uu.elephas.model.Product;

import java.util.Optional;

public interface ProductService {

    Object create(Product product);

    Optional<Product> getById(Long idProduct);

}
