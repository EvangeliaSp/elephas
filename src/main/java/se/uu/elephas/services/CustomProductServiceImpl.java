package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.uu.elephas.model.CustomProduct;
import se.uu.elephas.model.Product;
import se.uu.elephas.repository.CustomProductRepository;
import se.uu.elephas.repository.MaterialRepository;
import se.uu.elephas.repository.ProductRepository;

@Service
public class CustomProductServiceImpl implements CustomProductService {

    public CustomProductServiceImpl() {}

    @Autowired
    private CustomProductRepository customProductRepository;

    public Object create(CustomProduct product) {
        return(customProductRepository.save(product));
    }

    public Iterable<CustomProduct> getAllCustomCreations() {
        return customProductRepository.findAll();
    }

    public Iterable<CustomProduct> getCreationsByUser(Long idUser) {
        return customProductRepository.findByIdUser(idUser);
    }

}
