package se.uu.elephas.model;

import javax.persistence.*;

@Entity
@Table (name="material")
public class Material {
    @Id
    private int idMaterial;

    private String name;


    public Material () {
    }

    public Material (int idType, String name) {
        this.idMaterial = idMaterial;
        this.name = name;
    }

    public int getIdMaterial() {return idMaterial;}
    public void setIdType(int idType) {this.idMaterial = idType;}

    public String getName() {return name;}
    public void setName() {this.name = name;}
}
