/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterdemoTestModule } from '../../../test.module';
import { OrganismComponent } from 'app/entities/organism/organism.component';
import { OrganismService } from 'app/entities/organism/organism.service';
import { Organism } from 'app/shared/model/organism.model';

describe('Component Tests', () => {
  describe('Organism Management Component', () => {
    let comp: OrganismComponent;
    let fixture: ComponentFixture<OrganismComponent>;
    let service: OrganismService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterdemoTestModule],
        declarations: [OrganismComponent],
        providers: []
      })
        .overrideTemplate(OrganismComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrganismComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrganismService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Organism(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.organisms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
