/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterdemoTestModule } from '../../../test.module';
import { VoitureDeleteDialogComponent } from 'app/entities/voiture/voiture-delete-dialog.component';
import { VoitureService } from 'app/entities/voiture/voiture.service';

describe('Component Tests', () => {
  describe('Voiture Management Delete Component', () => {
    let comp: VoitureDeleteDialogComponent;
    let fixture: ComponentFixture<VoitureDeleteDialogComponent>;
    let service: VoitureService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [VoitureDeleteDialogComponent]
      })
        .overrideTemplate(VoitureDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VoitureDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VoitureService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
