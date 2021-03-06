package se.uu.elephas.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.uu.elephas.model.Product;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {


    Optional<Product> findById(Long idProduct);

    Iterable<Product> findByTypeInAndMaterialInAndColorIn(List<Integer> type, List<Integer> material, List<Integer> color);

    Iterable<Product> findByMaterialInAndColorIn(List<Integer> material, List<Integer> color);

    Iterable<Product> findByTypeInAndMaterialIn(List<Integer> type, List<Integer> material);

    Iterable<Product> findByTypeInAndColorIn(List<Integer> type, List<Integer> color);

    Iterable<Product> findByTypeIn(List<Integer> type);

    Iterable<Product> findByColorIn(List<Integer> color);

    Iterable<Product> findByMaterialIn(List<Integer> material);

}
