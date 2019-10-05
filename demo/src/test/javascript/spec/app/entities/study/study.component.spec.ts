/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterdemoTestModule } from '../../../test.module';
import { StudyComponent } from 'app/entities/study/study.component';
import { StudyService } from 'app/entities/study/study.service';
import { Study } from 'app/shared/model/study.model';

describe('Component Tests', () => {
  describe('Study Management Component', () => {
    let comp: StudyComponent;
    let fixture: ComponentFixture<StudyComponent>;
    let service: StudyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [StudyComponent],
        providers: []
      })
        .overrideTemplate(StudyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StudyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StudyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Study(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.studies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
