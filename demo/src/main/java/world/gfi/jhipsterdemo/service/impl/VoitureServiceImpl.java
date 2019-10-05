package world.gfi.jhipsterdemo.service.impl;

import world.gfi.jhipsterdemo.service.VoitureService;
import world.gfi.jhipsterdemo.domain.Voiture;
import world.gfi.jhipsterdemo.repository.VoitureRepository;
import world.gfi.jhipsterdemo.service.dto.VoitureDTO;
import world.gfi.jhipsterdemo.service.mapper.VoitureMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Voiture}.
 */
@Service
@Transactional
public class VoitureServiceImpl implements VoitureService {

    private final Logger log = LoggerFactory.getLogger(VoitureServiceImpl.class);

    private final VoitureRepository voitureRepository;

    private final VoitureMapper voitureMapper;

    public VoitureServiceImpl(VoitureRepository voitureRepository, VoitureMapper voitureMapper) {
        this.voitureRepository = voitureRepository;
        this.voitureMapper = voitureMapper;
    }

    /**
     * Save a voiture.
     *
     * @param voitureDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public VoitureDTO save(VoitureDTO voitureDTO) {
        log.debug("Request to save Voiture : {}", voitureDTO);
        Voiture voiture = voitureMapper.toEntity(voitureDTO);
        voiture = voitureRepository.save(voiture);
        return voitureMapper.toDto(voiture);
    }

    /**
     * Get all the voitures.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<VoitureDTO> findAll() {
        log.debug("Request to get all Voitures");
        return voitureRepository.findAll().stream()
            .map(voitureMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one voiture by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VoitureDTO> findOne(Long id) {
        log.debug("Request to get Voiture : {}", id);
        return voitureRepository.findById(id)
            .map(voitureMapper::toDto);
    }

    /**
     * Delete the voiture by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Voiture : {}", id);
        voitureRepository.deleteById(id);
    }
}
