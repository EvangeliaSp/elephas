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
    public void setIdMaterial(int idType) {this.idMaterial = idMaterial;}

    public String getName() {return name;}
    public void setName() {this.name = name;}
}
