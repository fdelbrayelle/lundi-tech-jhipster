import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStudy } from 'app/shared/model/study.model';
import { AccountService } from 'app/core';
import { StudyService } from './study.service';

@Component({
  selector: 'jhi-study',
  templateUrl: './study.component.html'
})
export class StudyComponent implements OnInit, OnDestroy {
  studies: IStudy[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected studyService: StudyService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.studyService
      .query()
      .pipe(
        filter((res: HttpResponse<IStudy[]>) => res.ok),
        map((res: HttpResponse<IStudy[]>) => res.body)
      )
      .subscribe(
        (res: IStudy[]) => {
          this.studies = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStudies();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStudy) {
    return item.id;
  }

  registerChangeInStudies() {
    this.eventSubscriber = this.eventManager.subscribe('studyListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
