package world.gfi.jhipsterdemo.service;

import world.gfi.jhipsterdemo.service.dto.VoitureDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link world.gfi.jhipsterdemo.domain.Voiture}.
 */
public interface VoitureService {

    /**
     * Save a voiture.
     *
     * @param voitureDTO the entity to save.
     * @return the persisted entity.
     */
    VoitureDTO save(VoitureDTO voitureDTO);

    /**
     * Get all the voitures.
     *
     * @return the list of entities.
     */
    List<VoitureDTO> findAll();


    /**
     * Get the "id" voiture.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VoitureDTO> findOne(Long id);

    /**
     * Delete the "id" voiture.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
