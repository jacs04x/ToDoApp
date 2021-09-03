import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoComponent} from './components/todo/todo.component';
import {AboutComponent} from './components/about/about.component';

const routes: Routes = [
  {path : '', component: TodoComponent},
  {path: 'about', component: AboutComponent},
  { path: '**', component: TodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
