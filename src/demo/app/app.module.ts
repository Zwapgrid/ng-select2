import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Select2Module } from '../../index';

import { DataService } from './services/data.service';
import { BasicComponent, ChangeComponent, OptionsComponent, DynamicComponent, MatcherComponent, TemplateComponent, MultipleComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ChangeComponent,
    DynamicComponent,
    OptionsComponent,
    TemplateComponent,
    MatcherComponent,
    MultipleComponent
  ],
  imports: [
    BrowserModule,
    Select2Module
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
