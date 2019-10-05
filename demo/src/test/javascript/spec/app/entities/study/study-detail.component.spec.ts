/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterdemoTestModule } from '../../../test.module';
import { StudyDetailComponent } from 'app/entities/study/study-detail.component';
import { Study } from 'app/shared/model/study.model';

describe('Component Tests', () => {
  describe('Study Management Detail Component', () => {
    let comp: StudyDetailComponent;
    let fixture: ComponentFixture<StudyDetailComponent>;
    const route = ({ data: of({ study: new Study(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [StudyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StudyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StudyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.study).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
