import {Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'website';

  constructor(
    private renderer: Renderer2
  ) {
    // this.detectTheme()
  }

  private detectTheme() {
    const darkTheme = window.hasOwnProperty('matchMedia')
      && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkTheme) {
      this.renderer.addClass(document.documentElement, 'is-dark-theme');
      this.renderer.removeClass(document.documentElement, 'is-light-theme');
    } else {
      this.renderer.addClass(document.documentElement, 'is-light-theme');
      this.renderer.removeClass(document.documentElement, 'is-dark-theme');
    }
  }

}
