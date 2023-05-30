import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ROUTE_HOME, ROUTE_LOGIN } from '../app.routes';
import { AuthService } from '../store/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Subscription } from 'rxjs';
import { User } from '../store/auth/models/auth-user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  authSubscription!: Subscription;
  authUser!: User | null;
  constructor(private store: Store<AppState>, public authService: AuthService) { }
  homeRoutePath = ROUTE_HOME;
  loginRoutePath = ROUTE_LOGIN;

  @Input() activePage!: string;

  ngOnInit(): void {
    this.authSubscription = this.store
      .select(state => state.auth)
      .subscribe(authState => {
        this.authUser = authState.user;
        if (this.authUser) {
          // user is logged in and valid
        }
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  routeContains(routeSubset: string): boolean {
    if (this.activePage) {
      return this.activePage.includes(routeSubset);
    }
    return false;
  }
}
