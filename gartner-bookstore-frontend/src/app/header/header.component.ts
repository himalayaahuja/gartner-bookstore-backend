import { Component } from '@angular/core';
import { User } from '../store/auth/models/auth-user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authUser: User | null = null;

  logout(): void {
    // this.authService.token = null;
    // this.store.dispatch(new SetCurrentUser(null));
    // this.router.navigate([ROUTE_LOGIN]);
  }


}
