package world.gfi.jhipsterdemo.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import world.gfi.jhipsterdemo.domain.enumeration.StudyType;

/**
 * A Study.
 */
@Entity
@Table(name = "study")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Study implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nid", nullable = false)
    private String nid;

    @Enumerated(EnumType.STRING)
    @Column(name = "study_type")
    private StudyType studyType;

    @OneToOne
    @JoinColumn(unique = true)
    private Country country;

    @OneToOne
    @JoinColumn(unique = true)
    private Organism organism;

    @OneToMany(mappedBy = "study")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StudyVersion> versions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNid() {
        return nid;
    }

    public Study nid(String nid) {
        this.nid = nid;
        return this;
    }

    public void setNid(String nid) {
        this.nid = nid;
    }

    public StudyType getStudyType() {
        return studyType;
    }

    public Study studyType(StudyType studyType) {
        this.studyType = studyType;
        return this;
    }

    public void setStudyType(StudyType studyType) {
        this.studyType = studyType;
    }

    public Country getCountry() {
        return country;
    }

    public Study country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Organism getOrganism() {
        return organism;
    }

    public Study organism(Organism organism) {
        this.organism = organism;
        return this;
    }

    public void setOrganism(Organism organism) {
        this.organism = organism;
    }

    public Set<StudyVersion> getVersions() {
        return versions;
    }

    public Study versions(Set<StudyVersion> studyVersions) {
        this.versions = studyVersions;
        return this;
    }

    public Study addVersions(StudyVersion studyVersion) {
        this.versions.add(studyVersion);
        studyVersion.setStudy(this);
        return this;
    }

    public Study removeVersions(StudyVersion studyVersion) {
        this.versions.remove(studyVersion);
        studyVersion.setStudy(null);
        return this;
    }

    public void setVersions(Set<StudyVersion> studyVersions) {
        this.versions = studyVersions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Study)) {
            return false;
        }
        return id != null && id.equals(((Study) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Study{" +
            "id=" + getId() +
            ", nid='" + getNid() + "'" +
            ", studyType='" + getStudyType() + "'" +
            "}";
    }
}
