import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {pluck} from 'rxjs/operators';
import {SafeHtml} from '@angular/platform-browser';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  readonly post$: Observable<SafeHtml> = this.route.data.pipe(pluck('post'));

  constructor(
    private route: ActivatedRoute
  ) {
  }
}
