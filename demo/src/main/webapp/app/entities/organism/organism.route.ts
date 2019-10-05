import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Organism } from 'app/shared/model/organism.model';
import { OrganismService } from './organism.service';
import { OrganismComponent } from './organism.component';
import { OrganismDetailComponent } from './organism-detail.component';
import { OrganismUpdateComponent } from './organism-update.component';
import { OrganismDeletePopupComponent } from './organism-delete-dialog.component';
import { IOrganism } from 'app/shared/model/organism.model';

@Injectable({ providedIn: 'root' })
export class OrganismResolve implements Resolve<IOrganism> {
  constructor(private service: OrganismService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrganism> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Organism>) => response.ok),
        map((organism: HttpResponse<Organism>) => organism.body)
      );
    }
    return of(new Organism());
  }
}

export const organismRoute: Routes = [
  {
    path: '',
    component: OrganismComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.organism.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrganismDetailComponent,
    resolve: {
      organism: OrganismResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.organism.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrganismUpdateComponent,
    resolve: {
      organism: OrganismResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.organism.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrganismUpdateComponent,
    resolve: {
      organism: OrganismResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.organism.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const organismPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrganismDeletePopupComponent,
    resolve: {
      organism: OrganismResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterdemoApp.organism.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
