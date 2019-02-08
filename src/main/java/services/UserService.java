package services;

import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import repository.UserRepository;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.SecureRandom;

public class UserService {

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
        Object ur = userRepository.save(user);
        return (ur);

    }
}
