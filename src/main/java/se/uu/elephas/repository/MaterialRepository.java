package se.uu.elephas.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import se.uu.elephas.model.Material;


@Repository
//@Transactional
public interface MaterialRepository extends CrudRepository<Material, Long> {

    Page<Material> findAll(Pageable pageable);
}