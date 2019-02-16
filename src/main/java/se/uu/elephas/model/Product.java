package se.uu.elephas.model;

import org.springframework.data.annotation.Id;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Lob;

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduct;

    @Column(nullable = false)
    private int type;

    @Column(nullable = false)
    private int material;

    @Column(nullable = false)
    private int color;

    @Lob
    @Column(length = 6000, columnDefinition = "Text")
    private char description;

    @Column(columnDefinition="Decimal(10,2) default '100.00'")
    private float price;

    @Column
    private float discount;

    public Product() {

    }

    public Product(Long idProduct, int type, int material, int color, char description, float price, float discount) {
        this.idProduct = idProduct;
        this.type = type;
        this.material = material;
        this.color = color;
        this.description = description;
        this.price = price;
        this.discount = discount;
    }

    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
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

    public char getDescription() {return description;}

    public void setDescription(char description) {this.description = description;}

    public float getPrice() {return price;}

    public void setPrice(float price) {this.price = price;}

    public float getDiscount() {return discount;}

    public void setDiscount(float discount) {this.discount = discount;}
}
