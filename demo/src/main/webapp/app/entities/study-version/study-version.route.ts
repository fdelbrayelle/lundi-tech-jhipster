import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StudyVersion } from 'app/shared/model/study-version.model';
import { StudyVersionService } from './study-version.service';
import { StudyVersionComponent } from './study-version.component';
import { StudyVersionDetailComponent } from './study-version-detail.component';
import { StudyVersionUpdateComponent } from './study-version-update.component';
import { StudyVersionDeletePopupComponent } from './study-version-delete-dialog.component';
import { IStudyVersion } from 'app/shared/model/study-version.model';

@Injectable({ providedIn: 'root' })
export class StudyVersionResolve implements Resolve<IStudyVersion> {
  constructor(private service: StudyVersionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStudyVersion> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<StudyVersion>) => response.ok),
        map((studyVersion: HttpResponse<StudyVersion>) => studyVersion.body)
      );
    }
    return of(new StudyVersion());
  }
}

export const studyVersionRoute: Routes = [
  {
    path: '',
    component: StudyVersionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.studyVersion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StudyVersionDetailComponent,
    resolve: {
      studyVersion: StudyVersionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.studyVersion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StudyVersionUpdateComponent,
    resolve: {
      studyVersion: StudyVersionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.studyVersion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StudyVersionUpdateComponent,
    resolve: {
      studyVersion: StudyVersionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.studyVersion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const studyVersionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StudyVersionDeletePopupComponent,
    resolve: {
      studyVersion: StudyVersionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.studyVersion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
