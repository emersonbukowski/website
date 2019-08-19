import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ContentService} from '../services/content.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirstPostRedirectGuard implements CanActivate {

  constructor(
    private router: Router,
    private contentService: ContentService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UrlTree> | boolean {
    if (!next?.firstChild?.paramMap?.has('id')) {
      return this.contentService.allPostsMetadata()
        .pipe(
          map(([{slug}]) => this.router.createUrlTree(['posts', slug]))
        );
    }
    return true;
  }

}
