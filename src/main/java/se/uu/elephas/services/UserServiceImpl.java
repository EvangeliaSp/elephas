package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.uu.elephas.model.User;
import se.uu.elephas.repository.UserRepository;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Optional;

@Service//("userService")
//@Transactional
public class UserServiceImpl implements UserService {

    public UserServiceImpl() {}

    @Autowired
    private UserRepository userRepository;

    public Object create(User user, MessageDigest md) {

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

        return (userRepository.save(user));

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
        newUser.setId(id);
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
        }

        return (userRepository.save(newUser));
    }

}
