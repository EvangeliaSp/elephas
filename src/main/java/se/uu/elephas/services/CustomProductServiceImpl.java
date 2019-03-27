package se.uu.elephas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.uu.elephas.model.CustomProduct;
import se.uu.elephas.model.UpdateCustomProduct;
import se.uu.elephas.repository.CustomProductRepository;

import java.util.Optional;

@Service
public class CustomProductServiceImpl implements CustomProductService {

    public CustomProductServiceImpl() {}

    @Autowired
    private CustomProductRepository customProductRepository;

    public Object create(CustomProduct product) {
        return(customProductRepository.save(product));
    }

    public CustomProduct update(UpdateCustomProduct updateCustomProduct) {

        Optional<CustomProduct> customProductOptional = customProductRepository.findById(updateCustomProduct.getId());

        if (customProductOptional.isPresent()) {
            CustomProduct customProduct = customProductOptional.get();
            customProduct.setPrice(updateCustomProduct.getPrice());
            customProduct.setDiscount(updateCustomProduct.getDiscount());
            customProduct.setStatus(updateCustomProduct.getStatus());
            customProductRepository.save(customProduct);
            return customProduct;
        }
        return null;
    }

    public CustomProduct update(Long idCustomProduct, int status) {

        Optional<CustomProduct> customProductOptional = customProductRepository.findById(idCustomProduct);

        if (customProductOptional.isPresent()) {
            CustomProduct customProduct = customProductOptional.get();
            customProduct.setStatus(status);
            customProductRepository.save(customProduct);
            return customProduct;
        }
        return null;
    }

    public Iterable<CustomProduct> getAllCustomCreations() {
        return customProductRepository.findAll();
    }

    public Iterable<CustomProduct> getCreationsByUser(Long idUser) {
        return customProductRepository.findByIdUser(idUser);
    }

}
