package se.uu.elephas.services;

import se.uu.elephas.model.User;

import java.security.MessageDigest;
import java.util.List;
import java.util.Optional;

public interface UserService {

    Object create(User user, MessageDigest md);

    Optional<User> getById(Long id);

    void delete(Long id);

    Object update(User user, Long id);

    Iterable<User> getAll();

}
