import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Observable, interval, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.scss']
})
export class SearchAreaComponent implements OnInit {

  gifs: Object[] = [];
  timer: Observable<number> = interval(1000);
  inputObs: Observable<string>;
  inputElement: any;
  constructor(private gifService: ApiCallService) {
  }


  ngOnInit() {
    this.inputElement = document.getElementById("searchBox");
    this.inputObs = fromEvent(this.inputElement, 'input').pipe(
      map(e => e['target'].value),
      filter(text => text.length > 3),
      debounceTime(400),
      distinctUntilChanged()
    );
    this.inputObs.subscribe(val => this.gifService.getGifs(val).subscribe(res => this.gifs = res['data']));
    this.timer.subscribe();
  }

}
