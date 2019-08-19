import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ContentService} from '../services/content.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {

  readonly projectMetadata$ = this.contentService.allProjectsMetadata();

  constructor(
    private contentService: ContentService
  ) {
  }
}
