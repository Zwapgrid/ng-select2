import { NgModule } from '@angular/core';
import { NgSelect2Component } from './ng-select2.component';

export { Select2OptionData, Select2TemplateFunction } from './ng-select2.interface';
export { NgSelect2Component } from './ng-select2.component';

@NgModule({
    declarations: [NgSelect2Component],
    exports: [NgSelect2Component]
})
export class Select2Module {}