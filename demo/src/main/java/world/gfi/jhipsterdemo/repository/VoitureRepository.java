package world.gfi.jhipsterdemo.repository;

import world.gfi.jhipsterdemo.domain.Voiture;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Voiture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VoitureRepository extends JpaRepository<Voiture, Long> {

}
