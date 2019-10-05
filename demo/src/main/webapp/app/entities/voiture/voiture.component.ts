import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVoiture } from 'app/shared/model/voiture.model';
import { AccountService } from 'app/core';
import { VoitureService } from './voiture.service';

@Component({
  selector: 'jhi-voiture',
  templateUrl: './voiture.component.html'
})
export class VoitureComponent implements OnInit, OnDestroy {
  voitures: IVoiture[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected voitureService: VoitureService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.voitureService
      .query()
      .pipe(
        filter((res: HttpResponse<IVoiture[]>) => res.ok),
        map((res: HttpResponse<IVoiture[]>) => res.body)
      )
      .subscribe(
        (res: IVoiture[]) => {
          this.voitures = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVoitures();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVoiture) {
    return item.id;
  }

  registerChangeInVoitures() {
    this.eventSubscriber = this.eventManager.subscribe('voitureListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
