import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVoiture } from 'app/shared/model/voiture.model';
import { VoitureService } from './voiture.service';

@Component({
  selector: 'jhi-voiture-delete-dialog',
  templateUrl: './voiture-delete-dialog.component.html'
})
export class VoitureDeleteDialogComponent {
  voiture: IVoiture;

  constructor(protected voitureService: VoitureService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.voitureService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'voitureListModification',
        content: 'Deleted an voiture'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-voiture-delete-popup',
  template: ''
})
export class VoitureDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ voiture }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VoitureDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.voiture = voiture;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/voiture', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/voiture', { outlets: { popup: null } }]);
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
