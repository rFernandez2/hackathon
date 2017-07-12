import { ArticleService } from './article.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article.component';
import { SideBarComponent } from './sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
