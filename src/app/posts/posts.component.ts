import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {PostMetadata} from '../services/content.service';
import {AppService, Breakpoint} from '../services/app.service';

interface PostsState {
  posts: PostMetadata[];
  breakpoint: Breakpoint;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  readonly posts$: Observable<PostMetadata[]> = this.route.data.pipe(pluck('posts'));
  readonly state$: Observable<PostsState> = combineLatest([
    this.route.data.pipe(pluck('posts')),
    this.appService.breakpoint$
  ])
    .pipe(
      map(([posts, breakpoint]) => ({posts, breakpoint}))
    );

  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
  }

}
