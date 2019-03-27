package se.uu.elephas.model;

import javax.persistence.*;

@Entity
@Table (name="custom_product_table")
public class CustomProduct {

    @Id
    @GeneratedValue
    private Long idCustomProduct;

    @Column(nullable = false)
    private int type;

    @Column(nullable = false)
    private int material;

    @Column(nullable = false)
    private int color;

    @Column(length = 6000, columnDefinition = "Text")
    private String description;

    @Column(columnDefinition="Decimal(10,2)")
    private float price;

    private float discount;

    @Column(columnDefinition="varchar(127)")
    private String name;

    @Column(columnDefinition="varchar(511)")
    private String image;

    private int status;

    private int quantity;

    private int delivery;

    private Long idUser;

    public CustomProduct() {

    }

    public CustomProduct(int type, int material, int color, String description, float price, float discount, String name, String image, int status, int quantity, int delivery, Long idUser) {
        this.type = type;
        this.material = material;
        this.color = color;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.name = name;
        this.image = image;
        this.status = status;
        this.quantity = quantity;
        this.delivery = delivery;
        this.idUser = idUser;
    }

    public Long getIdCustomProduct() {
        return idCustomProduct;
    }

    public void setIdCustomProduct(Long idCustomProduct) {
        this.idCustomProduct = idCustomProduct;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getMaterial() {return material;}

    public void setMaterial(int material) {this.material = material;}

    public int getColor() {return color;}

    public void setColor(int color) {this.color = color;}

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

    public float getPrice() {return price;}

    public void setPrice(float price) {this.price = price;}

    public float getDiscount() {return discount;}

    public void setDiscount(float discount) {this.discount = discount;}

    public String getName() { return name; }

    public void setName(String name) {this.name = name; }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getDelivery() {
        return delivery;
    }

    public void setDelivery(int delivery) {
        this.delivery = delivery;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }
}
