package se.uu.elephas.services;

import se.uu.elephas.model.CustomProduct;
import se.uu.elephas.model.UpdateCustomProduct;

public interface CustomProductService {

    Object create(CustomProduct product);

    CustomProduct update(UpdateCustomProduct updateCustomProduct);

    CustomProduct update(Long idCustomProduct, int status);

    Iterable<CustomProduct> getAllCustomCreations();

    Iterable<CustomProduct> getCreationsByUser(Long idUser);

}
