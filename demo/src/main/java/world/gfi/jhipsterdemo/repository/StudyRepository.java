package world.gfi.jhipsterdemo.repository;

import world.gfi.jhipsterdemo.domain.Study;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Study entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {

}
