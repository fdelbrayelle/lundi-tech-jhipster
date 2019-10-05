import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IVoiture, Voiture } from 'app/shared/model/voiture.model';
import { VoitureService } from './voiture.service';

@Component({
  selector: 'jhi-voiture-update',
  templateUrl: './voiture-update.component.html'
})
export class VoitureUpdateComponent implements OnInit {
  voiture: IVoiture;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.maxLength(5)]]
  });

  constructor(protected voitureService: VoitureService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ voiture }) => {
      this.updateForm(voiture);
      this.voiture = voiture;
    });
  }

  updateForm(voiture: IVoiture) {
    this.editForm.patchValue({
      id: voiture.id,
      nom: voiture.nom
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const voiture = this.createFromForm();
    if (voiture.id !== undefined) {
      this.subscribeToSaveResponse(this.voitureService.update(voiture));
    } else {
      this.subscribeToSaveResponse(this.voitureService.create(voiture));
    }
  }

  private createFromForm(): IVoiture {
    const entity = {
      ...new Voiture(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVoiture>>) {
    result.subscribe((res: HttpResponse<IVoiture>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
