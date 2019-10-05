import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudyVersion } from 'app/shared/model/study-version.model';
import { StudyVersionService } from './study-version.service';

@Component({
  selector: 'jhi-study-version-delete-dialog',
  templateUrl: './study-version-delete-dialog.component.html'
})
export class StudyVersionDeleteDialogComponent {
  studyVersion: IStudyVersion;

  constructor(
    protected studyVersionService: StudyVersionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.studyVersionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'studyVersionListModification',
        content: 'Deleted an studyVersion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-study-version-delete-popup',
  template: ''
})
export class StudyVersionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ studyVersion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StudyVersionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.studyVersion = studyVersion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/study-version', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/study-version', { outlets: { popup: null } }]);
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
