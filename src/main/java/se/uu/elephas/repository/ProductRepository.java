package se.uu.elephas.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.uu.elephas.model.Product;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {


    Optional<Product> findById(Long idProduct);

    Iterable<Product> findByCustom(Boolean custom);

    Iterable<Product> findByTypeInAndMaterialInAndColorInAndCustom(List<Integer> type, List<Integer> material, List<Integer> color, Boolean custom);

    Iterable<Product> findByMaterialInAndColorInAndCustom(List<Integer> material, List<Integer> color, Boolean custom);

    Iterable<Product> findByTypeInAndMaterialInAndCustom(List<Integer> type, List<Integer> material, Boolean custom);

    Iterable<Product> findByTypeInAndColorInAndCustom(List<Integer> type, List<Integer> color, Boolean custom);

    Iterable<Product> findByTypeInAndCustom(List<Integer> type, Boolean custom);

    Iterable<Product> findByColorInAndCustom(List<Integer> color, Boolean custom);

    Iterable<Product> findByMaterialInAndCustom(List<Integer> material, Boolean custom);

}
