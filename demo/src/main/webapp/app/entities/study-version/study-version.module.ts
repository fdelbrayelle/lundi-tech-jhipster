import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterdemoSharedModule } from 'app/shared';
import {
  StudyVersionComponent,
  StudyVersionDetailComponent,
  StudyVersionUpdateComponent,
  StudyVersionDeletePopupComponent,
  StudyVersionDeleteDialogComponent,
  studyVersionRoute,
  studyVersionPopupRoute
} from './';

const ENTITY_STATES = [...studyVersionRoute, ...studyVersionPopupRoute];

@NgModule({
  imports: [JhipsterdemoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StudyVersionComponent,
    StudyVersionDetailComponent,
    StudyVersionUpdateComponent,
    StudyVersionDeleteDialogComponent,
    StudyVersionDeletePopupComponent
  ],
  entryComponents: [
    StudyVersionComponent,
    StudyVersionUpdateComponent,
    StudyVersionDeleteDialogComponent,
    StudyVersionDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterdemoStudyVersionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
