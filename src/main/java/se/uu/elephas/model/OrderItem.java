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

    //@OneToOne
//    @JoinColumn(name = "product_id")
//    @RestResource(path = "libraryAddress", rel="address")
    //private Product product;


    public OrderItem() {}

    public OrderItem(Order sourceOrder) {
        this.sourceOrder = sourceOrder;
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
}
