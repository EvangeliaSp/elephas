package se.uu.elephas.model;

public class BasketItem {

    private Long id;

    private String name;

    private String url;

    private int quantity;

    private float price;

    private float discount;

    public BasketItem(Long id, String name, String url, int quantity, float price, float discount) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getDiscount() {
        return discount;
    }

    public void setDiscount(float discount) {
        this.discount = discount;
    }
}
