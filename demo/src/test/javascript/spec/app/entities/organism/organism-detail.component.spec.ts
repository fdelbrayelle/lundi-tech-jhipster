/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterdemoTestModule } from '../../../test.module';
import { OrganismDetailComponent } from 'app/entities/organism/organism-detail.component';
import { Organism } from 'app/shared/model/organism.model';

describe('Component Tests', () => {
  describe('Organism Management Detail Component', () => {
    let comp: OrganismDetailComponent;
    let fixture: ComponentFixture<OrganismDetailComponent>;
    const route = ({ data: of({ organism: new Organism(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [OrganismDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrganismDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrganismDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.organism).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
