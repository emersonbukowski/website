import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ProjectMetadata} from '../../services/content.service';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectPreviewComponent {
  readonly data$ = new ReplaySubject<ProjectMetadata>(1);


  @Input() set data(value: ProjectMetadata) {
    this.data$.next(value);
  }
}
