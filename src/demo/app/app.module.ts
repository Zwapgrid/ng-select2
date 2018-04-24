import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { Select2Module } from '../../index';

import { DataService } from './services/data.service';
import { BasicComponent, 
  ChangeComponent, 
  OptionsComponent, 
  DynamicComponent, 
  MatcherComponent, 
  TemplateComponent, 
  MultipleComponent, 
  TagsComponent 
} from './components';


const appRoutes:Routes = [
  {
    path: '',
    redirectTo: '/basic',
    pathMatch: 'full'
  },
  {
    path: 'basic',
    component:BasicComponent
  },
  {
    path: 'change',
    component:ChangeComponent
  },
  {
    path: 'options',
    component:OptionsComponent
  },
  {
    path: 'dynamic',
    component:DynamicComponent
  },
  {
    path: 'matcher',
    component:MatcherComponent
  },
  {
    path: 'template',
    component:TemplateComponent
  },
  {
    path: 'multiple',
    component:MultipleComponent
  },
  {
    path: 'tags',
    component:TagsComponent
  },
  {
    path: '**',
    redirectTo: '/basic'
  },
]


@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ChangeComponent,
    DynamicComponent,
    OptionsComponent,
    TemplateComponent,
    MatcherComponent,
    MultipleComponent,
    TagsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    Select2Module
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
