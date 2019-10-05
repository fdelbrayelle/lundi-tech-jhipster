package world.gfi.jhipsterdemo.service.mapper;

import world.gfi.jhipsterdemo.domain.*;
import world.gfi.jhipsterdemo.service.dto.VoitureDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Voiture} and its DTO {@link VoitureDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface VoitureMapper extends EntityMapper<VoitureDTO, Voiture> {



    default Voiture fromId(Long id) {
        if (id == null) {
            return null;
        }
        Voiture voiture = new Voiture();
        voiture.setId(id);
        return voiture;
    }
}
