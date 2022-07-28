import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { HomeComponent } from './components/home/home.component';
import { NewComponent } from './components/new/new.component';

const routes: Routes = [
  { path: 'new', component: NewComponent},
  { path: 'checklist/:id', component: ChecklistComponent },
  { path: 'checklist/:id/edit', component: ChecklistComponent, data: { editMode: true } },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
