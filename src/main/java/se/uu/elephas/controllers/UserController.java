package se.uu.elephas.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.uu.elephas.model.User;
import se.uu.elephas.repository.UserRepository;
import se.uu.elephas.services.UserService;
import se.uu.elephas.services.UserServiceImpl;
//import se.uu.elephas.services.UserService;
//import se.uu.elephas.services.UserServiceImpl;

import javax.validation.ConstraintViolationException;
import java.security.MessageDigest;

//import se.uu.elephas.model.User;
//import se.uu.elephas.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
//    private UserRepository userRepository;
    //@Qualifier("userService")
    private UserServiceImpl userService;

    @RequestMapping("/")
    public String home(){
        return "Hello Elephas!";
    }


    @RequestMapping(value = "/create", method = {RequestMethod.POST})
    public ResponseEntity<String> create(@RequestBody User user) throws Exception {

        MessageDigest md = MessageDigest.getInstance("MD5");

        try {
            userService.create(user, md);
        } catch (ConstraintViolationException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User cannot be created.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(user));

    }

//    @RequestMapping(value = "/all", method = {RequestMethod.GET})
//    public ResponseEntity<String> findAll() {
//
//        Page<User> users = userService.findAll();
//        if (users)
////        try {
////            a = userService.findAll();
////        } catch (ConstraintViolationException e) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User cannot be created.");
////        }
//
//        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(user));
//
//    }

}
