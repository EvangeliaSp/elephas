package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.uu.elephas.model.Product;
import se.uu.elephas.model.Material;
import se.uu.elephas.repository.ProductRepository;
import se.uu.elephas.repository.MaterialRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceimpl implements ProductService {

    public ProductServiceimpl() {}

    @Autowired
    private ProductRepository productRepository;

    @Autowired MaterialRepository materialRepository;

    public Object create(Product product) {
        return(productRepository.save(product));
    }

    public Optional<Product> getById(Long idProduct) {
        return(productRepository.findById(idProduct));
    }

    public Iterable<Product> getByParam(List<Integer> type, List<Integer> material, List<Integer> color) {

        if (type==null && material==null && color==null) {
            return productRepository.findAll();
        }
        else if (type==null && material==null) {
            return productRepository.findByColorIn(color);
        }
        else if (type==null && color==null) {
            return productRepository.findByMaterialIn(material);
        }
        else if (material==null && color==null) {
            return productRepository.findByTypeIn(type);
        }
        else if (type==null) {
            return(productRepository.findByMaterialInAndColorIn(material, color));
        }
        else if (material==null) {
            return(productRepository.findByTypeInAndColorIn(type, color));
        }
        else if (color==null) {
            return(productRepository.findByTypeInAndMaterialIn(type, material));
        }
        else {
            return(productRepository.findByTypeInAndMaterialInAndColorIn(type, material, color));
        }
    }

    public Iterable<Material> getAllMaterials() {
        return materialRepository.findAll();
    }

    public Object update(Product newProduct, Long idProduct) {
        newProduct.setIdProduct(idProduct);
        return productRepository.save(newProduct);
    }

    public void delete(Long idProduct) {
        productRepository.deleteById(idProduct);
    }

}
