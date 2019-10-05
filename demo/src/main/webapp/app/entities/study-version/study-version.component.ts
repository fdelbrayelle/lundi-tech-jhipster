import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStudyVersion } from 'app/shared/model/study-version.model';
import { AccountService } from 'app/core';
import { StudyVersionService } from './study-version.service';

@Component({
  selector: 'jhi-study-version',
  templateUrl: './study-version.component.html'
})
export class StudyVersionComponent implements OnInit, OnDestroy {
  studyVersions: IStudyVersion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected studyVersionService: StudyVersionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.studyVersionService
      .query()
      .pipe(
        filter((res: HttpResponse<IStudyVersion[]>) => res.ok),
        map((res: HttpResponse<IStudyVersion[]>) => res.body)
      )
      .subscribe(
        (res: IStudyVersion[]) => {
          this.studyVersions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStudyVersions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStudyVersion) {
    return item.id;
  }

  registerChangeInStudyVersions() {
    this.eventSubscriber = this.eventManager.subscribe('studyVersionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
