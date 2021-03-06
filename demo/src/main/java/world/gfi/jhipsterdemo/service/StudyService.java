package world.gfi.jhipsterdemo.service;

import world.gfi.jhipsterdemo.domain.Study;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Study}.
 */
public interface StudyService {

    /**
     * Save a study.
     *
     * @param study the entity to save.
     * @return the persisted entity.
     */
    Study save(Study study);

    /**
     * Get all the studies.
     *
     * @return the list of entities.
     */
    List<Study> findAll();


    /**
     * Get the "id" study.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Study> findOne(Long id);

    /**
     * Delete the "id" study.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
