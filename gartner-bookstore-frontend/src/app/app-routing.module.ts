import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';
import { ROUTE_HOME } from './app.routes';

const routes: Routes = [
  {
    path: ROUTE_HOME,
    loadChildren: () => import('./modules/books/books.module').then(m => m.BooksModule),
    // canActivate: [AuthGuard, AdminGuard],
  },
  { path: '**', redirectTo: ROUTE_HOME }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
