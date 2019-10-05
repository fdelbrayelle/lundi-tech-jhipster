import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IStudyVersion, StudyVersion } from 'app/shared/model/study-version.model';
import { StudyVersionService } from './study-version.service';
import { IStudy } from 'app/shared/model/study.model';
import { StudyService } from 'app/entities/study';

@Component({
  selector: 'jhi-study-version-update',
  templateUrl: './study-version-update.component.html'
})
export class StudyVersionUpdateComponent implements OnInit {
  studyVersion: IStudyVersion;
  isSaving: boolean;

  studies: IStudy[];

  editForm = this.fb.group({
    id: [],
    name: [],
    creationDate: [],
    updateDate: [],
    study: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected studyVersionService: StudyVersionService,
    protected studyService: StudyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ studyVersion }) => {
      this.updateForm(studyVersion);
      this.studyVersion = studyVersion;
    });
    this.studyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStudy[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStudy[]>) => response.body)
      )
      .subscribe((res: IStudy[]) => (this.studies = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(studyVersion: IStudyVersion) {
    this.editForm.patchValue({
      id: studyVersion.id,
      name: studyVersion.name,
      creationDate: studyVersion.creationDate != null ? studyVersion.creationDate.format(DATE_TIME_FORMAT) : null,
      updateDate: studyVersion.updateDate != null ? studyVersion.updateDate.format(DATE_TIME_FORMAT) : null,
      study: studyVersion.study
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const studyVersion = this.createFromForm();
    if (studyVersion.id !== undefined) {
      this.subscribeToSaveResponse(this.studyVersionService.update(studyVersion));
    } else {
      this.subscribeToSaveResponse(this.studyVersionService.create(studyVersion));
    }
  }

  private createFromForm(): IStudyVersion {
    const entity = {
      ...new StudyVersion(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      creationDate:
        this.editForm.get(['creationDate']).value != null ? moment(this.editForm.get(['creationDate']).value, DATE_TIME_FORMAT) : undefined,
      updateDate:
        this.editForm.get(['updateDate']).value != null ? moment(this.editForm.get(['updateDate']).value, DATE_TIME_FORMAT) : undefined,
      study: this.editForm.get(['study']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudyVersion>>) {
    result.subscribe((res: HttpResponse<IStudyVersion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackStudyById(index: number, item: IStudy) {
    return item.id;
  }
}
