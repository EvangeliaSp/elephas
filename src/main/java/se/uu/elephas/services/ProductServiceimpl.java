package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.uu.elephas.model.Product;
import se.uu.elephas.repository.ProductRepository;

import java.util.Optional;

@Service
public class ProductServiceimpl implements ProductService {

    public ProductServiceimpl() {}

    @Autowired
    private ProductRepository productRepository;

    public Object create(Product product) {
        Object pr = productRepository.save(product);
        return(pr);
    }

    public Optional<Product> getById(Long idProduct) {
        return(productRepository.findById(idProduct));
    }



}
