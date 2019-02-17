package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.uu.elephas.model.User;
import se.uu.elephas.repository.UserRepository;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service//("userService")
//@Transactional
public class UserServiceImpl implements UserService {

    public UserServiceImpl() {
    }

    @Autowired
    private UserRepository userRepository;

    public Object create(User user, MessageDigest md) throws DataIntegrityViolationException {

        String content = user.getPassword();

        md.update(content.getBytes());
        byte[] digest = md.digest();
        String hashed = DatatypeConverter.printHexBinary(digest);

        user.setPassword(hashed);

        SecureRandom random = new SecureRandom();
        byte bytes[] = new byte[20];
        random.nextBytes(bytes);
        String token = bytes.toString();
        user.setToken(token);

        return userRepository.save(user);

    }

    public Optional<User> getById(Long id) {
        return(userRepository.findById(id));
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    // TODO: try-catch or if-else in case that user does not exist
    // TODO: create token from new password
    public Object update(User newUser, Long id) {
        newUser.setIdUser(id);
        Optional<User> optUser = userRepository.findById(id);

        if (optUser.isPresent()) {
            User user = optUser.get();
            if (newUser.getEmail() == null)
                newUser.setEmail(user.getEmail());

            if (newUser.getPassword() == null)
                newUser.setPassword(user.getPassword());

            if (newUser.getFirstname() == null)
                newUser.setFirstname(user.getFirstname());

            if (newUser.getLastname() == null)
                newUser.setLastname(user.getLastname());

            if (newUser.getCountry() == null)
                newUser.setCountry(user.getCountry());

            if (newUser.getStreetName() == null)
                newUser.setStreetName(user.getStreetName());

            if (newUser.getStreetNumber() == 0)
                newUser.setStreetNumber(user.getStreetNumber());

            if (newUser.getTelephone() == null)
                newUser.setTelephone(user.getTelephone());

            if (newUser.getStreetNumber() == 0)
                newUser.setStreetNumber(user.getStreetNumber());

            if (newUser.getZipCode() == null)
                newUser.setZipCode(user.getZipCode());


        }

        return (userRepository.save(newUser));
    }

    public Iterable<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> login(String email, String password, MessageDigest md) {

        String content = password;

        md.update(content.getBytes());
        byte[] digest = md.digest();
        String hashed = DatatypeConverter.printHexBinary(digest);

        return userRepository.findByEmailAndPassword(email, hashed);

    }
}
