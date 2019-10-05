package world.gfi.jhipsterdemo.web.rest;

import world.gfi.jhipsterdemo.JhipsterdemoApp;
import world.gfi.jhipsterdemo.domain.StudyVersion;
import world.gfi.jhipsterdemo.repository.StudyVersionRepository;
import world.gfi.jhipsterdemo.service.StudyVersionService;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static world.gfi.jhipsterdemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link StudyVersionResource} REST controller.
 */
@SpringBootTest(classes = JhipsterdemoApp.class)
public class StudyVersionResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private StudyVersionRepository studyVersionRepository;

    @Autowired
    private StudyVersionService studyVersionService;

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

    private MockMvc restStudyVersionMockMvc;

    private StudyVersion studyVersion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudyVersionResource studyVersionResource = new StudyVersionResource(studyVersionService);
        this.restStudyVersionMockMvc = MockMvcBuilders.standaloneSetup(studyVersionResource)
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
    public static StudyVersion createEntity(EntityManager em) {
        StudyVersion studyVersion = new StudyVersion()
            .name(DEFAULT_NAME)
            .creationDate(DEFAULT_CREATION_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return studyVersion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudyVersion createUpdatedEntity(EntityManager em) {
        StudyVersion studyVersion = new StudyVersion()
            .name(UPDATED_NAME)
            .creationDate(UPDATED_CREATION_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        return studyVersion;
    }

    @BeforeEach
    public void initTest() {
        studyVersion = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudyVersion() throws Exception {
        int databaseSizeBeforeCreate = studyVersionRepository.findAll().size();

        // Create the StudyVersion
        restStudyVersionMockMvc.perform(post("/api/study-versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studyVersion)))
            .andExpect(status().isCreated());

        // Validate the StudyVersion in the database
        List<StudyVersion> studyVersionList = studyVersionRepository.findAll();
        assertThat(studyVersionList).hasSize(databaseSizeBeforeCreate + 1);
        StudyVersion testStudyVersion = studyVersionList.get(studyVersionList.size() - 1);
        assertThat(testStudyVersion.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStudyVersion.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testStudyVersion.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createStudyVersionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studyVersionRepository.findAll().size();

        // Create the StudyVersion with an existing ID
        studyVersion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudyVersionMockMvc.perform(post("/api/study-versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studyVersion)))
            .andExpect(status().isBadRequest());

        // Validate the StudyVersion in the database
        List<StudyVersion> studyVersionList = studyVersionRepository.findAll();
        assertThat(studyVersionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStudyVersions() throws Exception {
        // Initialize the database
        studyVersionRepository.saveAndFlush(studyVersion);

        // Get all the studyVersionList
        restStudyVersionMockMvc.perform(get("/api/study-versions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studyVersion.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getStudyVersion() throws Exception {
        // Initialize the database
        studyVersionRepository.saveAndFlush(studyVersion);

        // Get the studyVersion
        restStudyVersionMockMvc.perform(get("/api/study-versions/{id}", studyVersion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(studyVersion.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStudyVersion() throws Exception {
        // Get the studyVersion
        restStudyVersionMockMvc.perform(get("/api/study-versions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudyVersion() throws Exception {
        // Initialize the database
        studyVersionService.save(studyVersion);

        int databaseSizeBeforeUpdate = studyVersionRepository.findAll().size();

        // Update the studyVersion
        StudyVersion updatedStudyVersion = studyVersionRepository.findById(studyVersion.getId()).get();
        // Disconnect from session so that the updates on updatedStudyVersion are not directly saved in db
        em.detach(updatedStudyVersion);
        updatedStudyVersion
            .name(UPDATED_NAME)
            .creationDate(UPDATED_CREATION_DATE)
            .updateDate(UPDATED_UPDATE_DATE);

        restStudyVersionMockMvc.perform(put("/api/study-versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStudyVersion)))
            .andExpect(status().isOk());

        // Validate the StudyVersion in the database
        List<StudyVersion> studyVersionList = studyVersionRepository.findAll();
        assertThat(studyVersionList).hasSize(databaseSizeBeforeUpdate);
        StudyVersion testStudyVersion = studyVersionList.get(studyVersionList.size() - 1);
        assertThat(testStudyVersion.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStudyVersion.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testStudyVersion.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingStudyVersion() throws Exception {
        int databaseSizeBeforeUpdate = studyVersionRepository.findAll().size();

        // Create the StudyVersion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudyVersionMockMvc.perform(put("/api/study-versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studyVersion)))
            .andExpect(status().isBadRequest());

        // Validate the StudyVersion in the database
        List<StudyVersion> studyVersionList = studyVersionRepository.findAll();
        assertThat(studyVersionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudyVersion() throws Exception {
        // Initialize the database
        studyVersionService.save(studyVersion);

        int databaseSizeBeforeDelete = studyVersionRepository.findAll().size();

        // Delete the studyVersion
        restStudyVersionMockMvc.perform(delete("/api/study-versions/{id}", studyVersion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<StudyVersion> studyVersionList = studyVersionRepository.findAll();
        assertThat(studyVersionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudyVersion.class);
        StudyVersion studyVersion1 = new StudyVersion();
        studyVersion1.setId(1L);
        StudyVersion studyVersion2 = new StudyVersion();
        studyVersion2.setId(studyVersion1.getId());
        assertThat(studyVersion1).isEqualTo(studyVersion2);
        studyVersion2.setId(2L);
        assertThat(studyVersion1).isNotEqualTo(studyVersion2);
        studyVersion1.setId(null);
        assertThat(studyVersion1).isNotEqualTo(studyVersion2);
    }
}
