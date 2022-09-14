import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  public data$: Subject<any[]> = new BehaviorSubject<any[]>([]);
  public isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public rankedWords$: Subject<any[]> = new BehaviorSubject<any[]>([]);
  public wordCount$: Subject<any> = new BehaviorSubject<any>([]);

  constructor(private api: ApiService) {}

  getSampleData(url: string) {
    this.isLoading$.next(true);
    this.api.get(url).subscribe({
      next: (res) => {
        this.data$.next(res);
        this.isLoading$.next(false);
      },
      error: () => {
        this.isLoading$.next(false);
      },
    });
  }

  countWords(string: any) {
    const count = string.match(/(\w+)/g).length;
    this.wordCount$.next(count);
    return count;
  }

  checkWorkOccurences(text: string) {
    let textArr = text.split(' ');
    let arr = [...new Set(text.split(' '))];
    let words: any = [];
    arr.forEach((v, index) => {
      let data: any = {};
      let count = textArr.filter((c) => c == v).length;
      data.keyword = v;
      data.count = count;
      words.push(data);
      if (index == arr.length - 1) {
        this.rankWords(words);
      }
    });
  }
  rankWords(words: any[]) {
    let ranks = words.map((e: any) => e.count).sort((a: any, b: any) => b - a);
    let ranked = words.map((e: any) => ({
      ...e,
      rank: ranks.indexOf(e.count) + 1,
    }));
    let sorted = ranked
      .sort((a: any, b: any) => a.rank - b.rank)
      .filter((e: any) => ranked.indexOf(e) < 10);
    this.rankedWords$.next(sorted);
    return sorted;
  }
}
