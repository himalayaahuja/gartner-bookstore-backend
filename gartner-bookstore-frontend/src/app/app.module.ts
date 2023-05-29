import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, LoadingBarModule],
  providers: [CustomPreloadingStrategy],
  bootstrap: [AppComponent],
})
export class AppModule { }
