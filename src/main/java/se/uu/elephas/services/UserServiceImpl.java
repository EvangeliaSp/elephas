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
        Object ur = userRepository.save(user);
        return (ur);

    }

//sta

}
