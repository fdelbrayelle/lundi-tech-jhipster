import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrganism } from 'app/shared/model/organism.model';
import { AccountService } from 'app/core';
import { OrganismService } from './organism.service';

@Component({
  selector: 'jhi-organism',
  templateUrl: './organism.component.html'
})
export class OrganismComponent implements OnInit, OnDestroy {
  organisms: IOrganism[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected organismService: OrganismService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.organismService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrganism[]>) => res.ok),
        map((res: HttpResponse<IOrganism[]>) => res.body)
      )
      .subscribe(
        (res: IOrganism[]) => {
          this.organisms = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrganisms();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrganism) {
    return item.id;
  }

  registerChangeInOrganisms() {
    this.eventSubscriber = this.eventManager.subscribe('organismListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
