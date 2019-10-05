package world.gfi.jhipsterdemo.service.impl;

import world.gfi.jhipsterdemo.service.StudyService;
import world.gfi.jhipsterdemo.domain.Study;
import world.gfi.jhipsterdemo.repository.StudyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Study}.
 */
@Service
@Transactional
public class StudyServiceImpl implements StudyService {

    private final Logger log = LoggerFactory.getLogger(StudyServiceImpl.class);

    private final StudyRepository studyRepository;

    public StudyServiceImpl(StudyRepository studyRepository) {
        this.studyRepository = studyRepository;
    }

    /**
     * Save a study.
     *
     * @param study the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Study save(Study study) {
        log.debug("Request to save Study : {}", study);
        return studyRepository.save(study);
    }

    /**
     * Get all the studies.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Study> findAll() {
        log.debug("Request to get all Studies");
        return studyRepository.findAll();
    }


    /**
     * Get one study by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Study> findOne(Long id) {
        log.debug("Request to get Study : {}", id);
        return studyRepository.findById(id);
    }

    /**
     * Delete the study by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Study : {}", id);
        studyRepository.deleteById(id);
    }
}
