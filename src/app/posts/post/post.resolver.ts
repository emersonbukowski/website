import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SafeHtml} from '@angular/platform-browser';
import {ContentService} from '../../services/content.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<SafeHtml> {

  constructor(
    private contentService: ContentService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SafeHtml> {
    return this.contentService.postContent(route.paramMap.get('id'));
  }

}
