import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Voiture } from 'app/shared/model/voiture.model';
import { VoitureService } from './voiture.service';
import { VoitureComponent } from './voiture.component';
import { VoitureDetailComponent } from './voiture-detail.component';
import { VoitureUpdateComponent } from './voiture-update.component';
import { VoitureDeletePopupComponent } from './voiture-delete-dialog.component';
import { IVoiture } from 'app/shared/model/voiture.model';

@Injectable({ providedIn: 'root' })
export class VoitureResolve implements Resolve<IVoiture> {
  constructor(private service: VoitureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVoiture> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Voiture>) => response.ok),
        map((voiture: HttpResponse<Voiture>) => voiture.body)
      );
    }
    return of(new Voiture());
  }
}

export const voitureRoute: Routes = [
  {
    path: '',
    component: VoitureComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.voiture.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VoitureDetailComponent,
    resolve: {
      voiture: VoitureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.voiture.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VoitureUpdateComponent,
    resolve: {
      voiture: VoitureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.voiture.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VoitureUpdateComponent,
    resolve: {
      voiture: VoitureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.voiture.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const voiturePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VoitureDeletePopupComponent,
    resolve: {
      voiture: VoitureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.voiture.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
