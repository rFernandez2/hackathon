import { ArticleService } from './article.service';
import { ArticleObj } from './articleobj';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})

export class ArticleComponent implements OnInit {
  articles: ArticleObj[];
  items: 'hello';

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.items = 'hello';
    this.getArticles();
    console.log(this.articles);
  }

  getArticles(): void {
    this.articleService
        .getArticles()
        .subscribe((articles: ArticleObj[]) => {
          this.articles = articles;
        })
  }

}
