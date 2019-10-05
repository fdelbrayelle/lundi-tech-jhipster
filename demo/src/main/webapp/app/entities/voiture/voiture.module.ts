import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterdemoSharedModule } from 'app/shared';
import {
  VoitureComponent,
  VoitureDetailComponent,
  VoitureUpdateComponent,
  VoitureDeletePopupComponent,
  VoitureDeleteDialogComponent,
  voitureRoute,
  voiturePopupRoute
} from './';

const ENTITY_STATES = [...voitureRoute, ...voiturePopupRoute];

@NgModule({
  imports: [JhipsterdemoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VoitureComponent,
    VoitureDetailComponent,
    VoitureUpdateComponent,
    VoitureDeleteDialogComponent,
    VoitureDeletePopupComponent
  ],
  entryComponents: [VoitureComponent, VoitureUpdateComponent, VoitureDeleteDialogComponent, VoitureDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterdemoVoitureModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
