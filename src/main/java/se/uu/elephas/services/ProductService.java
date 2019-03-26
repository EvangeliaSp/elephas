package se.uu.elephas.services;

import se.uu.elephas.model.Product;
import se.uu.elephas.model.Material;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Object create(Product product);

    Optional<Product> getById(Long idProduct);

    Iterable<Product> getByParam(List<Integer> type, List<Integer> material, List<Integer> color);

    Iterable<Material> getAllMaterials();

    Object update(Product newProduct, Long idProduct);

    void delete(Long idProduct);

    Iterable<Product> getCreationsByUser(Long idUser);

}
