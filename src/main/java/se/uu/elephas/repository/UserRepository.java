package se.uu.elephas.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import se.uu.elephas.model.User;

import java.util.Optional;

@Repository
//@Transactional
public interface UserRepository extends CrudRepository<User, String> {

    Page<User> findAll(Pageable pageable);

    Optional<User> findByEmailAndPassword(String email, String password);
}
