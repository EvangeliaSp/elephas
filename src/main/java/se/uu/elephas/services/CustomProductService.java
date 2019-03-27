package se.uu.elephas.services;

import se.uu.elephas.model.CustomProduct;

public interface CustomProductService {

    Object create(CustomProduct product);

    Iterable<CustomProduct> getAllCustomCreations();

    Iterable<CustomProduct> getCreationsByUser(Long idUser);

}
