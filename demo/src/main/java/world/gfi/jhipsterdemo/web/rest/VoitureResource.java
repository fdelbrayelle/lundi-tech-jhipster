package world.gfi.jhipsterdemo.web.rest;

import world.gfi.jhipsterdemo.service.VoitureService;
import world.gfi.jhipsterdemo.web.rest.errors.BadRequestAlertException;
import world.gfi.jhipsterdemo.service.dto.VoitureDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link world.gfi.jhipsterdemo.domain.Voiture}.
 */
@RestController
@RequestMapping("/api")
public class VoitureResource {

    private final Logger log = LoggerFactory.getLogger(VoitureResource.class);

    private static final String ENTITY_NAME = "voiture";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VoitureService voitureService;

    public VoitureResource(VoitureService voitureService) {
        this.voitureService = voitureService;
    }

    /**
     * {@code POST  /voitures} : Create a new voiture.
     *
     * @param voitureDTO the voitureDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new voitureDTO, or with status {@code 400 (Bad Request)} if the voiture has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/voitures")
    public ResponseEntity<VoitureDTO> createVoiture(@Valid @RequestBody VoitureDTO voitureDTO) throws URISyntaxException {
        log.debug("REST request to save Voiture : {}", voitureDTO);
        if (voitureDTO.getId() != null) {
            throw new BadRequestAlertException("A new voiture cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VoitureDTO result = voitureService.save(voitureDTO);
        return ResponseEntity.created(new URI("/api/voitures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /voitures} : Updates an existing voiture.
     *
     * @param voitureDTO the voitureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated voitureDTO,
     * or with status {@code 400 (Bad Request)} if the voitureDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the voitureDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/voitures")
    public ResponseEntity<VoitureDTO> updateVoiture(@Valid @RequestBody VoitureDTO voitureDTO) throws URISyntaxException {
        log.debug("REST request to update Voiture : {}", voitureDTO);
        if (voitureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VoitureDTO result = voitureService.save(voitureDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, voitureDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /voitures} : get all the voitures.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of voitures in body.
     */
    @GetMapping("/voitures")
    public List<VoitureDTO> getAllVoitures() {
        log.debug("REST request to get all Voitures");
        return voitureService.findAll();
    }

    /**
     * {@code GET  /voitures/:id} : get the "id" voiture.
     *
     * @param id the id of the voitureDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the voitureDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/voitures/{id}")
    public ResponseEntity<VoitureDTO> getVoiture(@PathVariable Long id) {
        log.debug("REST request to get Voiture : {}", id);
        Optional<VoitureDTO> voitureDTO = voitureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(voitureDTO);
    }

    /**
     * {@code DELETE  /voitures/:id} : delete the "id" voiture.
     *
     * @param id the id of the voitureDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/voitures/{id}")
    public ResponseEntity<Void> deleteVoiture(@PathVariable Long id) {
        log.debug("REST request to delete Voiture : {}", id);
        voitureService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
