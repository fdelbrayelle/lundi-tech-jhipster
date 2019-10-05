package world.gfi.jhipsterdemo.web.rest;

import world.gfi.jhipsterdemo.JhipsterdemoApp;
import world.gfi.jhipsterdemo.domain.Study;
import world.gfi.jhipsterdemo.repository.StudyRepository;
import world.gfi.jhipsterdemo.service.StudyService;
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

import world.gfi.jhipsterdemo.domain.enumeration.StudyType;
/**
 * Integration tests for the {@Link StudyResource} REST controller.
 */
@SpringBootTest(classes = JhipsterdemoApp.class)
public class StudyResourceIT {

    private static final String DEFAULT_NID = "AAAAAAAAAA";
    private static final String UPDATED_NID = "BBBBBBBBBB";

    private static final StudyType DEFAULT_STUDY_TYPE = StudyType.KYC;
    private static final StudyType UPDATED_STUDY_TYPE = StudyType.KYI;

    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private StudyService studyService;

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

    private MockMvc restStudyMockMvc;

    private Study study;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudyResource studyResource = new StudyResource(studyService);
        this.restStudyMockMvc = MockMvcBuilders.standaloneSetup(studyResource)
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
    public static Study createEntity(EntityManager em) {
        Study study = new Study()
            .nid(DEFAULT_NID)
            .studyType(DEFAULT_STUDY_TYPE);
        return study;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Study createUpdatedEntity(EntityManager em) {
        Study study = new Study()
            .nid(UPDATED_NID)
            .studyType(UPDATED_STUDY_TYPE);
        return study;
    }

    @BeforeEach
    public void initTest() {
        study = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudy() throws Exception {
        int databaseSizeBeforeCreate = studyRepository.findAll().size();

        // Create the Study
        restStudyMockMvc.perform(post("/api/studies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(study)))
            .andExpect(status().isCreated());

        // Validate the Study in the database
        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeCreate + 1);
        Study testStudy = studyList.get(studyList.size() - 1);
        assertThat(testStudy.getNid()).isEqualTo(DEFAULT_NID);
        assertThat(testStudy.getStudyType()).isEqualTo(DEFAULT_STUDY_TYPE);
    }

    @Test
    @Transactional
    public void createStudyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studyRepository.findAll().size();

        // Create the Study with an existing ID
        study.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudyMockMvc.perform(post("/api/studies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(study)))
            .andExpect(status().isBadRequest());

        // Validate the Study in the database
        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNidIsRequired() throws Exception {
        int databaseSizeBeforeTest = studyRepository.findAll().size();
        // set the field null
        study.setNid(null);

        // Create the Study, which fails.

        restStudyMockMvc.perform(post("/api/studies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(study)))
            .andExpect(status().isBadRequest());

        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStudies() throws Exception {
        // Initialize the database
        studyRepository.saveAndFlush(study);

        // Get all the studyList
        restStudyMockMvc.perform(get("/api/studies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(study.getId().intValue())))
            .andExpect(jsonPath("$.[*].nid").value(hasItem(DEFAULT_NID.toString())))
            .andExpect(jsonPath("$.[*].studyType").value(hasItem(DEFAULT_STUDY_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getStudy() throws Exception {
        // Initialize the database
        studyRepository.saveAndFlush(study);

        // Get the study
        restStudyMockMvc.perform(get("/api/studies/{id}", study.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(study.getId().intValue()))
            .andExpect(jsonPath("$.nid").value(DEFAULT_NID.toString()))
            .andExpect(jsonPath("$.studyType").value(DEFAULT_STUDY_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStudy() throws Exception {
        // Get the study
        restStudyMockMvc.perform(get("/api/studies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudy() throws Exception {
        // Initialize the database
        studyService.save(study);

        int databaseSizeBeforeUpdate = studyRepository.findAll().size();

        // Update the study
        Study updatedStudy = studyRepository.findById(study.getId()).get();
        // Disconnect from session so that the updates on updatedStudy are not directly saved in db
        em.detach(updatedStudy);
        updatedStudy
            .nid(UPDATED_NID)
            .studyType(UPDATED_STUDY_TYPE);

        restStudyMockMvc.perform(put("/api/studies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStudy)))
            .andExpect(status().isOk());

        // Validate the Study in the database
        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeUpdate);
        Study testStudy = studyList.get(studyList.size() - 1);
        assertThat(testStudy.getNid()).isEqualTo(UPDATED_NID);
        assertThat(testStudy.getStudyType()).isEqualTo(UPDATED_STUDY_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingStudy() throws Exception {
        int databaseSizeBeforeUpdate = studyRepository.findAll().size();

        // Create the Study

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudyMockMvc.perform(put("/api/studies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(study)))
            .andExpect(status().isBadRequest());

        // Validate the Study in the database
        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudy() throws Exception {
        // Initialize the database
        studyService.save(study);

        int databaseSizeBeforeDelete = studyRepository.findAll().size();

        // Delete the study
        restStudyMockMvc.perform(delete("/api/studies/{id}", study.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Study.class);
        Study study1 = new Study();
        study1.setId(1L);
        Study study2 = new Study();
        study2.setId(study1.getId());
        assertThat(study1).isEqualTo(study2);
        study2.setId(2L);
        assertThat(study1).isNotEqualTo(study2);
        study1.setId(null);
        assertThat(study1).isNotEqualTo(study2);
    }
}
