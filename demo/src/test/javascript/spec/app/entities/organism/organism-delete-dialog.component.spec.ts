/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterdemoTestModule } from '../../../test.module';
import { OrganismDeleteDialogComponent } from 'app/entities/organism/organism-delete-dialog.component';
import { OrganismService } from 'app/entities/organism/organism.service';

describe('Component Tests', () => {
  describe('Organism Management Delete Component', () => {
    let comp: OrganismDeleteDialogComponent;
    let fixture: ComponentFixture<OrganismDeleteDialogComponent>;
    let service: OrganismService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [OrganismDeleteDialogComponent]
      })
        .overrideTemplate(OrganismDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrganismDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrganismService);
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
