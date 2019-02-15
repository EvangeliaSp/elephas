package se.uu.elephas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "order")
public class Order {
  
    @Id
    @GeneratedValue
    private Long idOrder;

    //@Id
    private Long idUser;

    private Status status; //FIXME: how to represent enum?
    private int paymentStatus; //FIXME: how to represent tinyint?
    // private ??? date; //TODO: what type is good to use for this?
    private float sum;
    private int confirm; //FIXME: how to represent tinyint?

    public Order() {}

    public Order(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdOrder() {
        return this.idOrder;
    }

    public void setIdOrder(Long id) {
        this.idOrder = id;
    }

    public Long getIdUser() {
        return this.idUser;
    }

    public void setIdUser(Long id) {
        this.idUser = id;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status s) {
        this.status = s;
    }

    public int getPaymentStatus() {
        return this.paymentStatus;
    }

    public void setPaymentStatus(int paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    /* 
    public ??? getDate() {
        return this.date;
    }

    public void setDate(??? date) {
        this.date = date;
    }
    */
    
    public float getSum() {
        return this.sum;
    }

    public void setSum(float sum) {
        this.sum = sum;
    }

    public int getConfirm() {
        return this.confirm;
    }

    public void setConfirm(int confirm) {
        this.confirm = confirm;
    }

}