import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from '../../services/content.service';
import {combineLatest} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  private readonly id$ = this.route.params
    .pipe(
      map(({id}) => id),
      shareReplay({refCount: true, bufferSize: 1})
    );
  private readonly metadata$ = this.id$.pipe(
    switchMap(id => this.contentService.projectMetadata(id))
  );
  private readonly content$ = this.id$.pipe(
    switchMap(id => this.contentService.projectContent(id))
  );
  state$ = combineLatest([
    this.metadata$,
    this.content$
  ])
    .pipe(
      map(([metadata, content]) => ({metadata, content}))
    );

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {
  }

}
