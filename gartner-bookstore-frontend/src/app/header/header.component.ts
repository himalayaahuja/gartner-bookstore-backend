import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../store/auth/models/auth-user.model';
import { AuthService } from '../store/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SetCurrentUser } from '../store/auth/actions/auth.actions';
import { ROUTE_LOGIN } from '../app.routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authSubscription: Subscription | null = null;
  authUser: User | null = null;
  progress!: number;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private loadingBar: LoadingBarService,
    // private broadcaster: BroadcasterService,
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.store
      .select((state) => state.auth)
      .subscribe((authState) => {
        this.authUser = authState.user;
      });

    // this.broadcaster.on<any>(KEY_SHOW_PROGRESS).subscribe((showProgress: boolean) => {
    //   showProgress ? this.startLoading() : this.stopLoading();
    // });

    this.loadingBar.useRef('main').value$.subscribe((progress: number) => {
      this.progress = progress;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.token = null;
    this.store.dispatch(new SetCurrentUser(null));
    this.router.navigate([ROUTE_LOGIN]);
  }

  startLoading(): void {
    if (!this.progress) {
      this.loadingBar.useRef('main').start();
    }
  }

  stopLoading(): void {
    this.loadingBar.useRef('main').complete();
  }
}
