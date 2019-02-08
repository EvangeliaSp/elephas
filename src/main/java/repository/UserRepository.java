package repository;

import model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

//@Repository
//@Transactional
public interface UserRepository extends CrudRepository {

    Page<User> findAll(Pageable pageable);

    Optional<User> findByEmailAndPassword(String email, String password);
}
