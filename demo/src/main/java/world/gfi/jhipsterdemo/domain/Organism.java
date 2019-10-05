package world.gfi.jhipsterdemo.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Organism.
 */
@Entity
@Table(name = "organism")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Organism implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "organism_name")
    private String organismName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganismName() {
        return organismName;
    }

    public Organism organismName(String organismName) {
        this.organismName = organismName;
        return this;
    }

    public void setOrganismName(String organismName) {
        this.organismName = organismName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Organism)) {
            return false;
        }
        return id != null && id.equals(((Organism) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Organism{" +
            "id=" + getId() +
            ", organismName='" + getOrganismName() + "'" +
            "}";
    }
}
