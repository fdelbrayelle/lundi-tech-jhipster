import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudy } from 'app/shared/model/study.model';
import { StudyService } from './study.service';

@Component({
  selector: 'jhi-study-delete-dialog',
  templateUrl: './study-delete-dialog.component.html'
})
export class StudyDeleteDialogComponent {
  study: IStudy;

  constructor(protected studyService: StudyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.studyService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'studyListModification',
        content: 'Deleted an study'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-study-delete-popup',
  template: ''
})
export class StudyDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ study }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StudyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.study = study;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/study', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/study', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
