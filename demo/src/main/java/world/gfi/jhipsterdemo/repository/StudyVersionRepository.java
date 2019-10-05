package world.gfi.jhipsterdemo.repository;

import world.gfi.jhipsterdemo.domain.StudyVersion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StudyVersion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudyVersionRepository extends JpaRepository<StudyVersion, Long> {

}
