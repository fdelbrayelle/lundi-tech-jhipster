package world.gfi.jhipsterdemo.web.rest;

import world.gfi.jhipsterdemo.domain.StudyVersion;
import world.gfi.jhipsterdemo.service.StudyVersionService;
import world.gfi.jhipsterdemo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link world.gfi.jhipsterdemo.domain.StudyVersion}.
 */
@RestController
@RequestMapping("/api")
public class StudyVersionResource {

    private final Logger log = LoggerFactory.getLogger(StudyVersionResource.class);

    private static final String ENTITY_NAME = "studyVersion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudyVersionService studyVersionService;

    public StudyVersionResource(StudyVersionService studyVersionService) {
        this.studyVersionService = studyVersionService;
    }

    /**
     * {@code POST  /study-versions} : Create a new studyVersion.
     *
     * @param studyVersion the studyVersion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studyVersion, or with status {@code 400 (Bad Request)} if the studyVersion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/study-versions")
    public ResponseEntity<StudyVersion> createStudyVersion(@RequestBody StudyVersion studyVersion) throws URISyntaxException {
        log.debug("REST request to save StudyVersion : {}", studyVersion);
        if (studyVersion.getId() != null) {
            throw new BadRequestAlertException("A new studyVersion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudyVersion result = studyVersionService.save(studyVersion);
        return ResponseEntity.created(new URI("/api/study-versions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /study-versions} : Updates an existing studyVersion.
     *
     * @param studyVersion the studyVersion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studyVersion,
     * or with status {@code 400 (Bad Request)} if the studyVersion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studyVersion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/study-versions")
    public ResponseEntity<StudyVersion> updateStudyVersion(@RequestBody StudyVersion studyVersion) throws URISyntaxException {
        log.debug("REST request to update StudyVersion : {}", studyVersion);
        if (studyVersion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudyVersion result = studyVersionService.save(studyVersion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studyVersion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /study-versions} : get all the studyVersions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studyVersions in body.
     */
    @GetMapping("/study-versions")
    public List<StudyVersion> getAllStudyVersions() {
        log.debug("REST request to get all StudyVersions");
        return studyVersionService.findAll();
    }

    /**
     * {@code GET  /study-versions/:id} : get the "id" studyVersion.
     *
     * @param id the id of the studyVersion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studyVersion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/study-versions/{id}")
    public ResponseEntity<StudyVersion> getStudyVersion(@PathVariable Long id) {
        log.debug("REST request to get StudyVersion : {}", id);
        Optional<StudyVersion> studyVersion = studyVersionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studyVersion);
    }

    /**
     * {@code DELETE  /study-versions/:id} : delete the "id" studyVersion.
     *
     * @param id the id of the studyVersion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/study-versions/{id}")
    public ResponseEntity<Void> deleteStudyVersion(@PathVariable Long id) {
        log.debug("REST request to delete StudyVersion : {}", id);
        studyVersionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
