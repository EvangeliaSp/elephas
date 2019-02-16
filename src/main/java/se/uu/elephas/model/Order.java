package se.uu.elephas.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "order")
public class Order {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private Long idUser;

    private Boolean confirm; //FIXME: how to represent tinyint?

    private float sum;

    private Timestamp date;

    private int status; //FIXME: how to represent enum?

    private Boolean paymentStatus;

    private int paymentType;

    public Order() {}

    // Constructor of basket
    public Order(Long idUser, Boolean confirm, float sum) {
        this.idUser = idUser;
        this.confirm = confirm;
        this.sum = sum;
    }

    public Long getIdOrder() {
        return this.id;
    }

    public void setIdOrder(Long id) {
        this.id = id;
    }

    public Long getIdUser() {
        return this.idUser;
    }

    public void setIdUser(Long id) {
        this.idUser = id;
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
}