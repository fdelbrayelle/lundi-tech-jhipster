import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStudy, Study } from 'app/shared/model/study.model';
import { StudyService } from './study.service';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country';
import { IOrganism } from 'app/shared/model/organism.model';
import { OrganismService } from 'app/entities/organism';

@Component({
  selector: 'jhi-study-update',
  templateUrl: './study-update.component.html'
})
export class StudyUpdateComponent implements OnInit {
  study: IStudy;
  isSaving: boolean;

  countries: ICountry[];

  organisms: IOrganism[];

  editForm = this.fb.group({
    id: [],
    nid: [null, [Validators.required]],
    studyType: [],
    country: [],
    organism: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected studyService: StudyService,
    protected countryService: CountryService,
    protected organismService: OrganismService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ study }) => {
      this.updateForm(study);
      this.study = study;
    });
    this.countryService
      .query({ filter: 'study-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICountry[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICountry[]>) => response.body)
      )
      .subscribe(
        (res: ICountry[]) => {
          if (!this.study.country || !this.study.country.id) {
            this.countries = res;
          } else {
            this.countryService
              .find(this.study.country.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICountry>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICountry>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICountry) => (this.countries = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.organismService
      .query({ filter: 'study-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IOrganism[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOrganism[]>) => response.body)
      )
      .subscribe(
        (res: IOrganism[]) => {
          if (!this.study.organism || !this.study.organism.id) {
            this.organisms = res;
          } else {
            this.organismService
              .find(this.study.organism.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IOrganism>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IOrganism>) => subResponse.body)
              )
              .subscribe(
                (subRes: IOrganism) => (this.organisms = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(study: IStudy) {
    this.editForm.patchValue({
      id: study.id,
      nid: study.nid,
      studyType: study.studyType,
      country: study.country,
      organism: study.organism
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const study = this.createFromForm();
    if (study.id !== undefined) {
      this.subscribeToSaveResponse(this.studyService.update(study));
    } else {
      this.subscribeToSaveResponse(this.studyService.create(study));
    }
  }

  private createFromForm(): IStudy {
    const entity = {
      ...new Study(),
      id: this.editForm.get(['id']).value,
      nid: this.editForm.get(['nid']).value,
      studyType: this.editForm.get(['studyType']).value,
      country: this.editForm.get(['country']).value,
      organism: this.editForm.get(['organism']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudy>>) {
    result.subscribe((res: HttpResponse<IStudy>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCountryById(index: number, item: ICountry) {
    return item.id;
  }

  trackOrganismById(index: number, item: IOrganism) {
    return item.id;
  }
}
