package world.gfi.jhipsterdemo.service;

import world.gfi.jhipsterdemo.domain.StudyVersion;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link StudyVersion}.
 */
public interface StudyVersionService {

    /**
     * Save a studyVersion.
     *
     * @param studyVersion the entity to save.
     * @return the persisted entity.
     */
    StudyVersion save(StudyVersion studyVersion);

    /**
     * Get all the studyVersions.
     *
     * @return the list of entities.
     */
    List<StudyVersion> findAll();


    /**
     * Get the "id" studyVersion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudyVersion> findOne(Long id);

    /**
     * Delete the "id" studyVersion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
