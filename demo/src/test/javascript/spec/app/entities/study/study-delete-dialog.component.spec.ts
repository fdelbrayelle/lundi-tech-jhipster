/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterdemoTestModule } from '../../../test.module';
import { StudyDeleteDialogComponent } from 'app/entities/study/study-delete-dialog.component';
import { StudyService } from 'app/entities/study/study.service';

describe('Component Tests', () => {
  describe('Study Management Delete Component', () => {
    let comp: StudyDeleteDialogComponent;
    let fixture: ComponentFixture<StudyDeleteDialogComponent>;
    let service: StudyService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [StudyDeleteDialogComponent]
      })
        .overrideTemplate(StudyDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StudyDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StudyService);
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
