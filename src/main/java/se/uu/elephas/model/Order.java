package se.uu.elephas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "order_table")
public class Order {

    @Id
    @GeneratedValue
    private Long idOrder;

    private Boolean confirm;

    private float sum;

    private Timestamp date;

    private int status;

    private Boolean paymentStatus;

    private int paymentType;

    @OneToMany(mappedBy = "sourceOrder", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<OrderItem> orderItems;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User orderUser;


    public Order() {}

    // Constructor of basket
    public Order(User orderUser, Boolean confirm, float sum) {
        this.orderUser = orderUser;
        this.confirm = confirm;
        this.sum = sum;
    }

    public Long getIdOrder() {
        return this.idOrder;
    }

    public void setIdOrder(Long idOrder) {
        this.idOrder = idOrder;
    }

    public Boolean getConfirm() {
        return this.confirm;
    }

    public void setConfirm(Boolean confirm) {
        this.confirm = confirm;
    }

    public float getSum() {
        return this.sum;
    }

    public void setSum(float sum) {
        this.sum = sum;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public Status getStatus() {
        switch (this.status) {
            case 1:
                return Status.COMPLETED;
            case 2:
                return Status.CANCELLED;
            case 3:
                return Status.SHIPPED;
            case 4:
                return Status.IN_PROGRESS;
            default:
                return null;
        }
    }

    public void setStatus(Status s) {
        this.status = s.getValue();
    }

    public Boolean getPaymentStatus() {
        return this.paymentStatus;
    }

    public void setPaymentStatus(Boolean paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public PaymentType getPaymentType() {
        switch (this.paymentType) {
            case 1:
                return PaymentType.CREDIT_CARD;
            case 2:
                return PaymentType.PAYPAL;
            case 3:
                return PaymentType.SWISH;
            default:
                return null;
        }
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType.getValue();
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public User getOrderUser() {
        return orderUser;
    }

    public void setOrderUser(User orderUser) {
        this.orderUser = orderUser;
    }
}