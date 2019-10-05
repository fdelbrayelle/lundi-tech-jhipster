import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterdemoSharedModule } from 'app/shared';
import {
  StudyComponent,
  StudyDetailComponent,
  StudyUpdateComponent,
  StudyDeletePopupComponent,
  StudyDeleteDialogComponent,
  studyRoute,
  studyPopupRoute
} from './';

const ENTITY_STATES = [...studyRoute, ...studyPopupRoute];

@NgModule({
  imports: [JhipsterdemoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [StudyComponent, StudyDetailComponent, StudyUpdateComponent, StudyDeleteDialogComponent, StudyDeletePopupComponent],
  entryComponents: [StudyComponent, StudyUpdateComponent, StudyDeleteDialogComponent, StudyDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterdemoStudyModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
