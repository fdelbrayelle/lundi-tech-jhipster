import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterdemoSharedModule } from 'app/shared';
import {
  OrganismComponent,
  OrganismDetailComponent,
  OrganismUpdateComponent,
  OrganismDeletePopupComponent,
  OrganismDeleteDialogComponent,
  organismRoute,
  organismPopupRoute
} from './';

const ENTITY_STATES = [...organismRoute, ...organismPopupRoute];

@NgModule({
  imports: [JhipsterdemoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrganismComponent,
    OrganismDetailComponent,
    OrganismUpdateComponent,
    OrganismDeleteDialogComponent,
    OrganismDeletePopupComponent
  ],
  entryComponents: [OrganismComponent, OrganismUpdateComponent, OrganismDeleteDialogComponent, OrganismDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterdemoOrganismModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
