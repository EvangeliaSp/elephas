package se.uu.elephas.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.uu.elephas.model.User;
import se.uu.elephas.services.OrderServiceImpl;
import se.uu.elephas.services.UserServiceImpl;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private OrderServiceImpl orderService;

    @RequestMapping(value = "/create", method = {RequestMethod.POST})
    public ResponseEntity<String> create(
            @RequestBody User user)
            throws NoSuchAlgorithmException, JsonProcessingException {

        MessageDigest md = MessageDigest.getInstance("MD5");

        try {
            User userObject = (User) userService.create(user, md);
            orderService.create(userObject.getIdUser());
        } catch (ConstraintViolationException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot create user.");
        } catch (DataIntegrityViolationException de) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cannot create user.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(user));

    }

    @RequestMapping(value = "/findById/{id}", method = {RequestMethod.GET})
    public ResponseEntity<String> findById(
            @PathVariable("id") @Valid Long id)
            throws JsonProcessingException {

        Optional<User> user = userService.getById(id);

        return user.isPresent()
                ? ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(user.get()))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id " + id + " does not exist.");

    }

    @RequestMapping(value = "/delete", method = {RequestMethod.DELETE})
    public ResponseEntity<String> delete(
            @RequestParam("id") @Valid Long id) {

        try {
            userService.delete(id);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id " + id + " not found.");
        }

        return ResponseEntity.status(HttpStatus.OK).body("Account of user " + id + " deleted successfully.");

    }

    @RequestMapping(value = "/update", method = {RequestMethod.PATCH})
    public ResponseEntity<String> update(
            @RequestParam("id") @Valid Long id,
            @RequestBody User user)
            throws NoSuchAlgorithmException, JsonProcessingException {

        MessageDigest md = MessageDigest.getInstance("MD5");

        Object updatedUser;

        try {
            updatedUser = userService.update(user, id, md);
        } catch (ConstraintViolationException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User with id " + id + "cannot be updated.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(updatedUser));

    }

    @RequestMapping(value = "/all", method = {RequestMethod.GET})
    public ResponseEntity<String> findAll()
            throws JsonProcessingException {

        Iterable<User> users = userService.getAll();

        return ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(users));
    }

    @RequestMapping(value = "/login", method = {RequestMethod.POST})
    public ResponseEntity<String> login(
            @RequestParam String email,
            @RequestParam String password)
            throws NoSuchAlgorithmException, JsonProcessingException {

        MessageDigest md = MessageDigest.getInstance("MD5");

        Optional<User> user = userService.login(email, password, md);

        return user.isPresent()
                ? ResponseEntity.status(HttpStatus.OK).body(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(user.get())) : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("");

    }

}
