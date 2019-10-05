import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Study } from 'app/shared/model/study.model';
import { StudyService } from './study.service';
import { StudyComponent } from './study.component';
import { StudyDetailComponent } from './study-detail.component';
import { StudyUpdateComponent } from './study-update.component';
import { StudyDeletePopupComponent } from './study-delete-dialog.component';
import { IStudy } from 'app/shared/model/study.model';

@Injectable({ providedIn: 'root' })
export class StudyResolve implements Resolve<IStudy> {
  constructor(private service: StudyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStudy> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Study>) => response.ok),
        map((study: HttpResponse<Study>) => study.body)
      );
    }
    return of(new Study());
  }
}

export const studyRoute: Routes = [
  {
    path: '',
    component: StudyComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.study.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StudyDetailComponent,
    resolve: {
      study: StudyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.study.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StudyUpdateComponent,
    resolve: {
      study: StudyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.study.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StudyUpdateComponent,
    resolve: {
      study: StudyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.study.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const studyPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StudyDeletePopupComponent,
    resolve: {
      study: StudyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.study.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
