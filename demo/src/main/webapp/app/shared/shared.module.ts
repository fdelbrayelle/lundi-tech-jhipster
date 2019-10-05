import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JhipsterdemoSharedLibsModule, JhipsterdemoSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [JhipsterdemoSharedLibsModule, JhipsterdemoSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [JhipsterdemoSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterdemoSharedModule {
  static forRoot() {
    return {
      ngModule: JhipsterdemoSharedModule
    };
  }
}
