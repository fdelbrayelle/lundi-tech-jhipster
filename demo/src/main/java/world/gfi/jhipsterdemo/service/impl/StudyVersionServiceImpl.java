package world.gfi.jhipsterdemo.service.impl;

import world.gfi.jhipsterdemo.service.StudyVersionService;
import world.gfi.jhipsterdemo.domain.StudyVersion;
import world.gfi.jhipsterdemo.repository.StudyVersionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link StudyVersion}.
 */
@Service
@Transactional
public class StudyVersionServiceImpl implements StudyVersionService {

    private final Logger log = LoggerFactory.getLogger(StudyVersionServiceImpl.class);

    private final StudyVersionRepository studyVersionRepository;

    public StudyVersionServiceImpl(StudyVersionRepository studyVersionRepository) {
        this.studyVersionRepository = studyVersionRepository;
    }

    /**
     * Save a studyVersion.
     *
     * @param studyVersion the entity to save.
     * @return the persisted entity.
     */
    @Override
    public StudyVersion save(StudyVersion studyVersion) {
        log.debug("Request to save StudyVersion : {}", studyVersion);
        return studyVersionRepository.save(studyVersion);
    }

    /**
     * Get all the studyVersions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<StudyVersion> findAll() {
        log.debug("Request to get all StudyVersions");
        return studyVersionRepository.findAll();
    }


    /**
     * Get one studyVersion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StudyVersion> findOne(Long id) {
        log.debug("Request to get StudyVersion : {}", id);
        return studyVersionRepository.findById(id);
    }

    /**
     * Delete the studyVersion by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StudyVersion : {}", id);
        studyVersionRepository.deleteById(id);
    }
}
