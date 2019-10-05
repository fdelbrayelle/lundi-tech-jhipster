import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IOrganism, Organism } from 'app/shared/model/organism.model';
import { OrganismService } from './organism.service';

@Component({
  selector: 'jhi-organism-update',
  templateUrl: './organism-update.component.html'
})
export class OrganismUpdateComponent implements OnInit {
  organism: IOrganism;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    organismName: []
  });

  constructor(protected organismService: OrganismService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ organism }) => {
      this.updateForm(organism);
      this.organism = organism;
    });
  }

  updateForm(organism: IOrganism) {
    this.editForm.patchValue({
      id: organism.id,
      organismName: organism.organismName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const organism = this.createFromForm();
    if (organism.id !== undefined) {
      this.subscribeToSaveResponse(this.organismService.update(organism));
    } else {
      this.subscribeToSaveResponse(this.organismService.create(organism));
    }
  }

  private createFromForm(): IOrganism {
    const entity = {
      ...new Organism(),
      id: this.editForm.get(['id']).value,
      organismName: this.editForm.get(['organismName']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganism>>) {
    result.subscribe((res: HttpResponse<IOrganism>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
