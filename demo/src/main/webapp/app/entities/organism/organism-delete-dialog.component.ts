import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrganism } from 'app/shared/model/organism.model';
import { OrganismService } from './organism.service';

@Component({
  selector: 'jhi-organism-delete-dialog',
  templateUrl: './organism-delete-dialog.component.html'
})
export class OrganismDeleteDialogComponent {
  organism: IOrganism;

  constructor(protected organismService: OrganismService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.organismService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'organismListModification',
        content: 'Deleted an organism'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-organism-delete-popup',
  template: ''
})
export class OrganismDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ organism }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrganismDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.organism = organism;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/organism', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/organism', { outlets: { popup: null } }]);
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
