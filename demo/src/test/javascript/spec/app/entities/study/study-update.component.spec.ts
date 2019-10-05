/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterdemoTestModule } from '../../../test.module';
import { StudyUpdateComponent } from 'app/entities/study/study-update.component';
import { StudyService } from 'app/entities/study/study.service';
import { Study } from 'app/shared/model/study.model';

describe('Component Tests', () => {
  describe('Study Management Update Component', () => {
    let comp: StudyUpdateComponent;
    let fixture: ComponentFixture<StudyUpdateComponent>;
    let service: StudyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [StudyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StudyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StudyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StudyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Study(123);
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
        const entity = new Study();
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
