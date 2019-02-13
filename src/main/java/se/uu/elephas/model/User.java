package se.uu.elephas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue
    private Long userId;

    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    //@JsonIgnore
    private String password;

    private String token;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(name = "country")
    private String country;

    @Column(name = "streetName")
    private String streetName;



    @Column(name = "zipCode")
    private String zipCode;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "streetNumber")
    private int streetNumber;


    public User() {

    }

    public User(String email, String password, String firstname, String lastname, String streetName, int streetNumber, String zipCode,
                String country, String telephone) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.zipCode = zipCode;
        this.country = country;
        this.telephone = telephone;
    }


    public Long getuserId() {
        return userId;
    }

    public void setuserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }


    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public int getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(int streetNumber) {
        this.streetNumber = streetNumber;
    }
}