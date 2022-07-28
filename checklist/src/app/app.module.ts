import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { NewComponent } from './components/new/new.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

const dbConfig: DBConfig  = {
  name: 'checklist',
  version: 1,
  objectStoresMeta: [{
    store: 'checklists',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'checklist', keypath: 'checklist', options: { unique: false } },
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChecklistComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,

    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


