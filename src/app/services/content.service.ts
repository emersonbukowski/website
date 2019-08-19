import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {map} from 'rxjs/operators';

interface ContentMetadata {
  title: string;
  published: boolean;
  data: string;
  tags: string[];
  categories: string[];
  slug: string;
}

export interface PostMetadata extends ContentMetadata {
  todo: string;
}

export interface ProjectMetadata extends ContentMetadata {
  description: string;
  thumbnail: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private httpClient: HttpClient,
    private domSanitizer: DomSanitizer
  ) {
  }


  allPostsMetadata(): Observable<PostMetadata[]> {
    return this.httpClient.get<PostMetadata[]>('/assets/posts/data.json');
  }

  postMetadata(slug: string): Observable<ContentMetadata> {
    return this.allPostsMetadata()
      .pipe(
        map(data => data.find(d => d.slug === slug))
      );
  }

  postContent(slug: string): Observable<SafeHtml> {
    return this.httpClient.get(`/assets/posts/${slug}.html`, {responseType: 'text'})
      .pipe(
        map(html => this.domSanitizer.bypassSecurityTrustHtml(html))
      );
  }

  allProjectsMetadata(): Observable<ProjectMetadata[]> {
    return this.httpClient.get<ProjectMetadata[]>('/assets/projects/data.json');
  }

  projectMetadata(slug: string): Observable<ProjectMetadata> {
    return this.allProjectsMetadata()
      .pipe(
        map(data => data.find(d => d.slug === slug))
      );
  }

  projectContent(slug: string): Observable<SafeHtml> {
    return this.httpClient.get(`/assets/projects/${slug}.html`, {responseType: 'text'})
      .pipe(
        map(html => this.domSanitizer.bypassSecurityTrustHtml(html))
      );
  }
}
