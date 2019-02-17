package se.uu.elephas.model;

import javax.persistence.*;

@Entity
@Table (name="color")
public class Color {
    @Id
    private int idColor;

    private String name;


    public Color () {
    }

    public Color (int idColor, String name) {
        this.idColor = idColor;
        this.name = name;
    }

    public int getIdMaterial() {return idColor;}
    public void setIdType(int idType) {this.idColor = idType;}

    public String getName() {return name;}
    public void setName() {this.name = name;}
}
