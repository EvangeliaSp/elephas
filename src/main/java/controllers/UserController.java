package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import services.UserService;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.security.MessageDigest;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    //@Qualifier("userService")
    private UserService userService;

    @RequestMapping(value="/index", method={RequestMethod.GET},headers="Accept=application/xml")
    public void findAll() {
        System.out.println("Hello Elephas!");
        //return ResponseEntity.status(HttpStatus.OK).body("{\"message\":\"userexists\"}");
    }

    @RequestMapping(value = "/create", method = {RequestMethod.POST}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<String> create(User user) throws Exception {

        MessageDigest md = MessageDigest.getInstance("MD5");

        try {
            userService.create(user, md);
        } catch (ConstraintViolationException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User cannot be created.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(user));


    }
}
