package se.uu.elephas.model;


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

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String streetname;


    @Column(nullable = false)
    private String zipcode;

    @Column(nullable = false)
    private String telephone;

    @Column(nullable = false)
    private int streetnumber;


    public User() {

    }

    public User(String email, String password, String firstname, String lastname, String streetname, int streetnumber, String zipcode,
                String country, String telephone) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.streetname = streetname;
        this.streetnumber = streetnumber;
        this.zipcode = zipcode;
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
        return streetname;
    }

    public void setStreetName(String streetName) {
        this.streetname = streetName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipCode() {
        return zipcode;
    }

    public void setZipCode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public int getStreetNumber() {
        return streetnumber;
    }

    public void setStreetNumber(int streetnumber) {
        this.streetnumber = streetnumber;
    }
}