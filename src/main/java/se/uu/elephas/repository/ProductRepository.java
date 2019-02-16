//package se.uu.elephas.repository;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//import se.uu.elephas.model.Product;
//
//import java.util.Optional;
//
//
//@Repository
////@Transactional
//public interface ProductRepository extends CrudRepository<Product, Long> {
//
//    Page<Product> findAll(Pageable pageable);
//
//    Optional<Product> findByIdProduct(Long idProduct);
//
//    Optional<Product> findByMaterial(int material);
//
//    Optional<Product> findByType(int type);
//
//    Optional<Product> findByColor(int color);
//
//    Optional<Product> findByMaterialandType(int material, int type);
//
//    Optional<Product> findByMaterialandColor(int material, int color);
//
//    Optional<Product> findByColorandType(int color, int type);
//
//    Optional<Product> findByMaterialandTypeandColor(int material, int type, int color);
//
//
//}
