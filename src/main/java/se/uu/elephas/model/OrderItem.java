package se.uu.elephas.model;

import javax.persistence.*;

@Entity
@Table(name = "order_item_table")
public class OrderItem {

    @Id
    @GeneratedValue
    private Long idOrderItem;

    private int quantity;


    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order sourceOrder;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;


    public OrderItem() {}

    public OrderItem(Order sourceOrder, Product product) {
        this.quantity = 1;
        this.sourceOrder = sourceOrder;
        this.product = product;
    }

    public Long getIdOrderItem() {
        return idOrderItem;
    }

    public void setIdOrderItem(Long idOrderItem) {
        this.idOrderItem = idOrderItem;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Order getSourceOrder() {
        return sourceOrder;
    }

    public Product getProduct() {
        return product;
    }

    public void setSourceOrder(Order sourceOrder) {
        this.sourceOrder = sourceOrder;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
