package world.gfi.jhipsterdemo.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A StudyVersion.
 */
@Entity
@Table(name = "study_version")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StudyVersion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "creation_date")
    private Instant creationDate;

    @Column(name = "update_date")
    private Instant updateDate;

    @ManyToOne
    @JsonIgnoreProperties("studyVersions")
    private Study study;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public StudyVersion name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public StudyVersion creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public StudyVersion updateDate(Instant updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public void setUpdateDate(Instant updateDate) {
        this.updateDate = updateDate;
    }

    public Study getStudy() {
        return study;
    }

    public StudyVersion study(Study study) {
        this.study = study;
        return this;
    }

    public void setStudy(Study study) {
        this.study = study;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudyVersion)) {
            return false;
        }
        return id != null && id.equals(((StudyVersion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StudyVersion{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
