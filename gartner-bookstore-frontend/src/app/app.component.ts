import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ROUTE_HOME, ROUTE_LOGIN } from './app.routes';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './store/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { SetInitialUser } from './store/auth/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dirtlej-frontend';
  activePage!: string;
  routeLogin = ROUTE_LOGIN;
  routeHome = ROUTE_HOME;
  authSubscription: Subscription | null = null;

  constructor(private renderer: Renderer2, private store: Store<AppState>, private router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.token) {
      this.store.dispatch(new SetInitialUser());
    }
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const urlTree = this.router.parseUrl(item.urlAfterRedirects);
        const urlWithoutParams = urlTree.root.children['primary'] ? urlTree.root.children['primary'].segments.map((it) => it.path).join('/') : '';
        this.activePage = urlWithoutParams;
        // console.log(urlWithoutParams);
        switch (urlWithoutParams) {
          case ROUTE_HOME:
            this.renderer.addClass(document.body, 'dasboard');
            break;

          default:
            this.renderer.addClass(document.body, 'dasboard');
            break;
        }
      }
    });

    this.authSubscription = this.store
      .select((state) => state.auth)
      .subscribe((authState) => {
        if (authState.user) {
          // user is logged in and valid
        }
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
