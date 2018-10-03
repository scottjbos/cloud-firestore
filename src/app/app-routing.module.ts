import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CctransactionComponent }   from './cctransaction/cctransaction.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'todo', component: TodoComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cctransaction', component: CctransactionComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
