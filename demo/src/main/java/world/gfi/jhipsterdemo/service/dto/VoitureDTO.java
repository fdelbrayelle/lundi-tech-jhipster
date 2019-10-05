package world.gfi.jhipsterdemo.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link world.gfi.jhipsterdemo.domain.Voiture} entity.
 */
public class VoitureDTO implements Serializable {

    private Long id;

    @Size(max = 5)
    private String nom;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VoitureDTO voitureDTO = (VoitureDTO) o;
        if (voitureDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), voitureDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VoitureDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
