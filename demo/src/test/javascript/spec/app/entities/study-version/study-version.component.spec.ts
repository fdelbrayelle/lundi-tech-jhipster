/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterdemoTestModule } from '../../../test.module';
import { StudyVersionComponent } from 'app/entities/study-version/study-version.component';
import { StudyVersionService } from 'app/entities/study-version/study-version.service';
import { StudyVersion } from 'app/shared/model/study-version.model';

describe('Component Tests', () => {
  describe('StudyVersion Management Component', () => {
    let comp: StudyVersionComponent;
    let fixture: ComponentFixture<StudyVersionComponent>;
    let service: StudyVersionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [StudyVersionComponent],
        providers: []
      })
        .overrideTemplate(StudyVersionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StudyVersionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StudyVersionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StudyVersion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.studyVersions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
