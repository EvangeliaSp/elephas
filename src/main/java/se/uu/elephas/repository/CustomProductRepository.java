package se.uu.elephas.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.uu.elephas.model.CustomProduct;

@Repository
public interface CustomProductRepository extends CrudRepository<CustomProduct, Long> {

    Iterable<CustomProduct> findByIdUser(Long idUser);

    Iterable<CustomProduct> findByStatus(int status);

}
