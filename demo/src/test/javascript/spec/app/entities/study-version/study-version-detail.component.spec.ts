/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterdemoTestModule } from '../../../test.module';
import { StudyVersionDetailComponent } from 'app/entities/study-version/study-version-detail.component';
import { StudyVersion } from 'app/shared/model/study-version.model';

describe('Component Tests', () => {
  describe('StudyVersion Management Detail Component', () => {
    let comp: StudyVersionDetailComponent;
    let fixture: ComponentFixture<StudyVersionDetailComponent>;
    const route = ({ data: of({ studyVersion: new StudyVersion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [StudyVersionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StudyVersionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StudyVersionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.studyVersion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
