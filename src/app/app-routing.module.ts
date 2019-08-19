import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from './projects/projects.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ProjectComponent} from './projects/project/project.component';
import {PostsComponent} from './posts/posts.component';
import {PostComponent} from './posts/post/post.component';
import {PostResolver} from './posts/post/post.resolver';
import {PostsResolver} from './posts/posts.resolver';
import {FirstPostRedirectGuard} from './posts/first-post-redirect.guard';


const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {
    path: 'posts',
    component: PostsComponent,
    resolve: {posts: PostsResolver},
    canActivate: [FirstPostRedirectGuard],
    children: [
      {path: ':id', component: PostComponent, resolve: {post: PostResolver}},
    ]
  },
  {path: 'contact', component: ContactComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/:id', component: ProjectComponent},
  {path: '', redirectTo: '/projects', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
