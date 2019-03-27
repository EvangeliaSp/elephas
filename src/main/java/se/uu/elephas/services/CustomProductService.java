package se.uu.elephas.services;

import se.uu.elephas.model.CustomProduct;

public interface CustomProductService {

    Object create(CustomProduct product);

    Object update(Long idCustomProduct, int status);

    Iterable<CustomProduct> getAllCustomCreations();

    Iterable<CustomProduct> getCreationsByUser(Long idUser);

}
