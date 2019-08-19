import {Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, startWith} from 'rxjs/operators';

export enum Breakpoint {
  mobile = 768, tablet = 769, desktop = 1024, widescreen = 1216, fullhd = 1408
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly breakpoint$: Observable<Breakpoint> = fromEvent(window, 'resize', {passive: true})
    .pipe(
      map(() => this.getBreakpoint()),
      startWith(this.getBreakpoint()),
      distinctUntilChanged(),
      shareReplay({bufferSize: 1, refCount: true}),
    );


  private getBreakpoint(): Breakpoint {
    const {innerWidth} = window;
    if (innerWidth <= Breakpoint.mobile) {
      return Breakpoint.mobile;
    } else if (innerWidth <= Breakpoint.tablet) {
      return Breakpoint.tablet;
    } else if (innerWidth <= Breakpoint.desktop) {
      return Breakpoint.desktop;
    } else if (innerWidth <= Breakpoint.widescreen) {
      return Breakpoint.widescreen;
    }
    return Breakpoint.fullhd;
  }

}
