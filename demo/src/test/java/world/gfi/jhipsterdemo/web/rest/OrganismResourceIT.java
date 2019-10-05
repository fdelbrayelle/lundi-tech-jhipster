package world.gfi.jhipsterdemo.web.rest;

import world.gfi.jhipsterdemo.JhipsterdemoApp;
import world.gfi.jhipsterdemo.domain.Organism;
import world.gfi.jhipsterdemo.repository.OrganismRepository;
import world.gfi.jhipsterdemo.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static world.gfi.jhipsterdemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link OrganismResource} REST controller.
 */
@SpringBootTest(classes = JhipsterdemoApp.class)
public class OrganismResourceIT {

    private static final String DEFAULT_ORGANISM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ORGANISM_NAME = "BBBBBBBBBB";

    @Autowired
    private OrganismRepository organismRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restOrganismMockMvc;

    private Organism organism;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrganismResource organismResource = new OrganismResource(organismRepository);
        this.restOrganismMockMvc = MockMvcBuilders.standaloneSetup(organismResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Organism createEntity(EntityManager em) {
        Organism organism = new Organism()
            .organismName(DEFAULT_ORGANISM_NAME);
        return organism;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Organism createUpdatedEntity(EntityManager em) {
        Organism organism = new Organism()
            .organismName(UPDATED_ORGANISM_NAME);
        return organism;
    }

    @BeforeEach
    public void initTest() {
        organism = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrganism() throws Exception {
        int databaseSizeBeforeCreate = organismRepository.findAll().size();

        // Create the Organism
        restOrganismMockMvc.perform(post("/api/organisms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organism)))
            .andExpect(status().isCreated());

        // Validate the Organism in the database
        List<Organism> organismList = organismRepository.findAll();
        assertThat(organismList).hasSize(databaseSizeBeforeCreate + 1);
        Organism testOrganism = organismList.get(organismList.size() - 1);
        assertThat(testOrganism.getOrganismName()).isEqualTo(DEFAULT_ORGANISM_NAME);
    }

    @Test
    @Transactional
    public void createOrganismWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = organismRepository.findAll().size();

        // Create the Organism with an existing ID
        organism.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrganismMockMvc.perform(post("/api/organisms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organism)))
            .andExpect(status().isBadRequest());

        // Validate the Organism in the database
        List<Organism> organismList = organismRepository.findAll();
        assertThat(organismList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOrganisms() throws Exception {
        // Initialize the database
        organismRepository.saveAndFlush(organism);

        // Get all the organismList
        restOrganismMockMvc.perform(get("/api/organisms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(organism.getId().intValue())))
            .andExpect(jsonPath("$.[*].organismName").value(hasItem(DEFAULT_ORGANISM_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getOrganism() throws Exception {
        // Initialize the database
        organismRepository.saveAndFlush(organism);

        // Get the organism
        restOrganismMockMvc.perform(get("/api/organisms/{id}", organism.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(organism.getId().intValue()))
            .andExpect(jsonPath("$.organismName").value(DEFAULT_ORGANISM_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrganism() throws Exception {
        // Get the organism
        restOrganismMockMvc.perform(get("/api/organisms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrganism() throws Exception {
        // Initialize the database
        organismRepository.saveAndFlush(organism);

        int databaseSizeBeforeUpdate = organismRepository.findAll().size();

        // Update the organism
        Organism updatedOrganism = organismRepository.findById(organism.getId()).get();
        // Disconnect from session so that the updates on updatedOrganism are not directly saved in db
        em.detach(updatedOrganism);
        updatedOrganism
            .organismName(UPDATED_ORGANISM_NAME);

        restOrganismMockMvc.perform(put("/api/organisms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrganism)))
            .andExpect(status().isOk());

        // Validate the Organism in the database
        List<Organism> organismList = organismRepository.findAll();
        assertThat(organismList).hasSize(databaseSizeBeforeUpdate);
        Organism testOrganism = organismList.get(organismList.size() - 1);
        assertThat(testOrganism.getOrganismName()).isEqualTo(UPDATED_ORGANISM_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingOrganism() throws Exception {
        int databaseSizeBeforeUpdate = organismRepository.findAll().size();

        // Create the Organism

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrganismMockMvc.perform(put("/api/organisms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organism)))
            .andExpect(status().isBadRequest());

        // Validate the Organism in the database
        List<Organism> organismList = organismRepository.findAll();
        assertThat(organismList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrganism() throws Exception {
        // Initialize the database
        organismRepository.saveAndFlush(organism);

        int databaseSizeBeforeDelete = organismRepository.findAll().size();

        // Delete the organism
        restOrganismMockMvc.perform(delete("/api/organisms/{id}", organism.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Organism> organismList = organismRepository.findAll();
        assertThat(organismList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Organism.class);
        Organism organism1 = new Organism();
        organism1.setId(1L);
        Organism organism2 = new Organism();
        organism2.setId(organism1.getId());
        assertThat(organism1).isEqualTo(organism2);
        organism2.setId(2L);
        assertThat(organism1).isNotEqualTo(organism2);
        organism1.setId(null);
        assertThat(organism1).isNotEqualTo(organism2);
    }
}
