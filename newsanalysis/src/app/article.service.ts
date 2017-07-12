import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ArticleObj } from './articleobj';

@Injectable()
export class ArticleService {

  articleUrl = 'assets/article.json';

  constructor(private http: Http) { }

  getArticles(): Observable<ArticleObj[]> {
    return this.http.get(this.articleUrl)
        .map((res: Response) => res.json());
  };

  private handleError(error: any): Promise<ArticleObj[]> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  };

}
