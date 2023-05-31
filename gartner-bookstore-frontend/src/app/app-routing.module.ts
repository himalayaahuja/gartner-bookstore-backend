import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';
import { ROUTE_HOME, ROUTE_LOGIN } from './app.routes';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: ROUTE_HOME,
    loadChildren: () => import('./modules/books/books.module').then(m => m.BooksModule),
  },
  {
    path: ROUTE_LOGIN,
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [GuestGuard]
  },
  { path: '**', redirectTo: ROUTE_HOME }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
