package se.uu.elephas.services;

import se.uu.elephas.model.User;

import java.security.MessageDigest;

public interface UserService {

    Object create(User user, MessageDigest md);

}
