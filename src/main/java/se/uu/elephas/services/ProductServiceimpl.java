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
//
//    public Iterable<Product> getAll() {
//        return productRepository.findAll();
//    }


    public Iterable<Product> getByParam(Integer type, Integer material, Integer color) {

        if (type==null && material==null && color==null) {
            return productRepository.findAll();
        }

        else if (type==null && material==null) {
            return productRepository.findByColor(color);
        }

        else if (type==null && color==null) {
            return productRepository.findByMaterial(material);
        }

        else if (material==null && color==null) {
            return productRepository.findByType(type);
        }

        else if (type==null) {
            return(productRepository.findByMaterialAndColor(material, color));
        }

        else if (material==null) {
            return(productRepository.findByTypeAndColor(type, color));
        }

        else if (color==null) {
            return(productRepository.findByTypeAndMaterial(type, material));

        }

        else {
            return(productRepository.findByTypeAndMaterialAndColor(type, material, color));
        }
    }


}
