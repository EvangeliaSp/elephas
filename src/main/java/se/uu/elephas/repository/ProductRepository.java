package se.uu.elephas.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.uu.elephas.model.Product;
import java.util.Optional;


@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {


    Optional<Product> findById(Long idProduct);

    Iterable<Product> findAll();

    Iterable<Product> findByTypeAndMaterialAndColor(int type, int material, int color);

    Iterable<Product> findByMaterialAndColor(int material, int color);

    Iterable<Product> findByTypeAndMaterial(int type, int material);

    Iterable<Product> findByTypeAndColor(int type, int color);

    Iterable<Product> findByType(int type);

    Iterable<Product> findByColor(int color);

    Iterable<Product> findByMaterial(int material);

}
