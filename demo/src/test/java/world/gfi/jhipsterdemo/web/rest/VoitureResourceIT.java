package world.gfi.jhipsterdemo.web.rest;

import world.gfi.jhipsterdemo.JhipsterdemoApp;
import world.gfi.jhipsterdemo.domain.Voiture;
import world.gfi.jhipsterdemo.repository.VoitureRepository;
import world.gfi.jhipsterdemo.service.VoitureService;
import world.gfi.jhipsterdemo.service.dto.VoitureDTO;
import world.gfi.jhipsterdemo.service.mapper.VoitureMapper;
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
 * Integration tests for the {@Link VoitureResource} REST controller.
 */
@SpringBootTest(classes = JhipsterdemoApp.class)
public class VoitureResourceIT {

    private static final String DEFAULT_NOM = "AAAAA";
    private static final String UPDATED_NOM = "BBBBB";

    @Autowired
    private VoitureRepository voitureRepository;

    @Autowired
    private VoitureMapper voitureMapper;

    @Autowired
    private VoitureService voitureService;

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

    private MockMvc restVoitureMockMvc;

    private Voiture voiture;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VoitureResource voitureResource = new VoitureResource(voitureService);
        this.restVoitureMockMvc = MockMvcBuilders.standaloneSetup(voitureResource)
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
    public static Voiture createEntity(EntityManager em) {
        Voiture voiture = new Voiture()
            .nom(DEFAULT_NOM);
        return voiture;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Voiture createUpdatedEntity(EntityManager em) {
        Voiture voiture = new Voiture()
            .nom(UPDATED_NOM);
        return voiture;
    }

    @BeforeEach
    public void initTest() {
        voiture = createEntity(em);
    }

    @Test
    @Transactional
    public void createVoiture() throws Exception {
        int databaseSizeBeforeCreate = voitureRepository.findAll().size();

        // Create the Voiture
        VoitureDTO voitureDTO = voitureMapper.toDto(voiture);
        restVoitureMockMvc.perform(post("/api/voitures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voitureDTO)))
            .andExpect(status().isCreated());

        // Validate the Voiture in the database
        List<Voiture> voitureList = voitureRepository.findAll();
        assertThat(voitureList).hasSize(databaseSizeBeforeCreate + 1);
        Voiture testVoiture = voitureList.get(voitureList.size() - 1);
        assertThat(testVoiture.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createVoitureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = voitureRepository.findAll().size();

        // Create the Voiture with an existing ID
        voiture.setId(1L);
        VoitureDTO voitureDTO = voitureMapper.toDto(voiture);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVoitureMockMvc.perform(post("/api/voitures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voitureDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Voiture in the database
        List<Voiture> voitureList = voitureRepository.findAll();
        assertThat(voitureList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVoitures() throws Exception {
        // Initialize the database
        voitureRepository.saveAndFlush(voiture);

        // Get all the voitureList
        restVoitureMockMvc.perform(get("/api/voitures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(voiture.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }
    
    @Test
    @Transactional
    public void getVoiture() throws Exception {
        // Initialize the database
        voitureRepository.saveAndFlush(voiture);

        // Get the voiture
        restVoitureMockMvc.perform(get("/api/voitures/{id}", voiture.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(voiture.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVoiture() throws Exception {
        // Get the voiture
        restVoitureMockMvc.perform(get("/api/voitures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVoiture() throws Exception {
        // Initialize the database
        voitureRepository.saveAndFlush(voiture);

        int databaseSizeBeforeUpdate = voitureRepository.findAll().size();

        // Update the voiture
        Voiture updatedVoiture = voitureRepository.findById(voiture.getId()).get();
        // Disconnect from session so that the updates on updatedVoiture are not directly saved in db
        em.detach(updatedVoiture);
        updatedVoiture
            .nom(UPDATED_NOM);
        VoitureDTO voitureDTO = voitureMapper.toDto(updatedVoiture);

        restVoitureMockMvc.perform(put("/api/voitures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voitureDTO)))
            .andExpect(status().isOk());

        // Validate the Voiture in the database
        List<Voiture> voitureList = voitureRepository.findAll();
        assertThat(voitureList).hasSize(databaseSizeBeforeUpdate);
        Voiture testVoiture = voitureList.get(voitureList.size() - 1);
        assertThat(testVoiture.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingVoiture() throws Exception {
        int databaseSizeBeforeUpdate = voitureRepository.findAll().size();

        // Create the Voiture
        VoitureDTO voitureDTO = voitureMapper.toDto(voiture);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVoitureMockMvc.perform(put("/api/voitures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voitureDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Voiture in the database
        List<Voiture> voitureList = voitureRepository.findAll();
        assertThat(voitureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVoiture() throws Exception {
        // Initialize the database
        voitureRepository.saveAndFlush(voiture);

        int databaseSizeBeforeDelete = voitureRepository.findAll().size();

        // Delete the voiture
        restVoitureMockMvc.perform(delete("/api/voitures/{id}", voiture.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Voiture> voitureList = voitureRepository.findAll();
        assertThat(voitureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Voiture.class);
        Voiture voiture1 = new Voiture();
        voiture1.setId(1L);
        Voiture voiture2 = new Voiture();
        voiture2.setId(voiture1.getId());
        assertThat(voiture1).isEqualTo(voiture2);
        voiture2.setId(2L);
        assertThat(voiture1).isNotEqualTo(voiture2);
        voiture1.setId(null);
        assertThat(voiture1).isNotEqualTo(voiture2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VoitureDTO.class);
        VoitureDTO voitureDTO1 = new VoitureDTO();
        voitureDTO1.setId(1L);
        VoitureDTO voitureDTO2 = new VoitureDTO();
        assertThat(voitureDTO1).isNotEqualTo(voitureDTO2);
        voitureDTO2.setId(voitureDTO1.getId());
        assertThat(voitureDTO1).isEqualTo(voitureDTO2);
        voitureDTO2.setId(2L);
        assertThat(voitureDTO1).isNotEqualTo(voitureDTO2);
        voitureDTO1.setId(null);
        assertThat(voitureDTO1).isNotEqualTo(voitureDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(voitureMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(voitureMapper.fromId(null)).isNull();
    }
}
