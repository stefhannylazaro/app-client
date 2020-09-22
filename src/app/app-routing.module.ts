import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home', loadChildren: () =>
      import('./modules/list-client/list-client.module').then(m => m.ListClientModule)
  },
  {
    path: 'new-client', loadChildren: () =>
      import('./modules/new-client/new-client.module').then(m => m.NewClientModule)
  },
  { path: '', redirectTo: 'home', pathMatch: `full` },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
