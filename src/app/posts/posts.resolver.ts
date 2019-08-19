import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ContentService, PostMetadata} from '../services/content.service';

@Injectable({
  providedIn: 'root',
})
export class PostsResolver implements Resolve<PostMetadata[]> {

  constructor(
    private contentService: ContentService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostMetadata[]> {
    return this.contentService.allPostsMetadata();
  }

}
