package se.uu.elephas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table (name="product_table")
public class Product {

    @Id
    @GeneratedValue
    private Long idProduct;

    @Column(nullable = false)
    private int type;

    @Column(nullable = false)
    private int material;

    @Column(nullable = false)
    private int color;

//    @Lob
    @Column(length = 6000, columnDefinition = "Text")
    private String description;

    //@Column(columnDefinition="Decimal(10,2) default '100.00'")
    @Column(columnDefinition="Decimal(10,2)")
    private float price;

    private float discount;

    @Column(columnDefinition="varchar(127)")
    private String name;

    @Column(columnDefinition="varchar(511)")
    private String url;

    private Boolean custom;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<OrderItem> orderItems;

    private Long idUser;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User customOwner;

    public Product() {

    }

    public Product(int type, int material, int color, String description, float price, float discount, String name, String url, Boolean custom) {
        this.type = type;
        this.material = material;
        this.color = color;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.name = name;
        this.url = url;
        this.custom = custom;
    }

    public Product(int type, int material, int color, String description, float price, float discount, String name, String url, Boolean custom, Long idUser) {
        this.type = type;
        this.material = material;
        this.color = color;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.name = name;
        this.url = url;
        this.custom = custom;
        this.idUser = idUser;
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

    public String getName() { return name; }

    public void setName(String name) {this.name = name; }

    public String getUrl() { return url; }

    public void setUrl(String url) { this.url = url; }

    public Boolean getCustom() {
        return custom;
    }

    public void setCustom(Boolean custom) {
        this.custom = custom;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }
}
