import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AboutComponent} from './about/about.component';
import {ProjectsComponent} from './projects/projects.component';
import {ContactComponent} from './contact/contact.component';
import {PostsComponent} from './posts/posts.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {HeroComponent} from './shared/hero/hero.component';
import {ProjectPreviewComponent} from './projects/project-preview/project-preview.component';
import {ProjectComponent} from './projects/project/project.component';
import {HttpClientModule} from '@angular/common/http';
import {PostComponent} from './posts/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    PostsComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    ProjectPreviewComponent,
    ProjectComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
