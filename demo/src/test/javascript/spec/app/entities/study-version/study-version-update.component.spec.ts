/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterdemoTestModule } from '../../../test.module';
import { StudyVersionUpdateComponent } from 'app/entities/study-version/study-version-update.component';
import { StudyVersionService } from 'app/entities/study-version/study-version.service';
import { StudyVersion } from 'app/shared/model/study-version.model';

describe('Component Tests', () => {
  describe('StudyVersion Management Update Component', () => {
    let comp: StudyVersionUpdateComponent;
    let fixture: ComponentFixture<StudyVersionUpdateComponent>;
    let service: StudyVersionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [StudyVersionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StudyVersionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StudyVersionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StudyVersionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StudyVersion(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new StudyVersion();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
