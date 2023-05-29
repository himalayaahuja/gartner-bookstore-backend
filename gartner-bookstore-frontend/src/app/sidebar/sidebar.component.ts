import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ROUTE_HOME } from '../app.routes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  homeRoutePath = ROUTE_HOME;
  @Input() activePage!: string;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  routeContains(routeSubset: string): boolean {
    if (this.activePage) {
      return this.activePage.includes(routeSubset);
    }
    return false;
  }
}
