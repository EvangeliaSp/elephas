package se.uu.elephas.model;

import javax.persistence.*;

@Entity
@Table (name="product_table")
public class Product {

    @Id
    @GeneratedValue
    private Long idProduct;

    //@Column(nullable = false)
    private int type;

    //@Column(nullable = false)
    private int material;

    //@Column(nullable = false)
    private int color;

//    @Lob
    @Column(length = 6000, columnDefinition = "Text")
    private String description;

    //@Column(columnDefinition="Decimal(10,2) default '100.00'")
    @Column(columnDefinition="Decimal(10,2)")
    private float price;

    private float discount;

    @OneToOne(mappedBy = "product")
    private OrderItem orderItem;


    public Product() {

    }

    public Product(int type, int material, int color, String description, float price, float discount) {
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

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

    public float getPrice() {return price;}

    public void setPrice(float price) {this.price = price;}

    public float getDiscount() {return discount;}

    public void setDiscount(float discount) {this.discount = discount;}
}
