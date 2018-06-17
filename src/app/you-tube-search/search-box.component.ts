import { Component, OnInit, Output, EventEmitter, ElementRef } from "@angular/core";
import { SearchResult } from "./search-result.model";
import { YouTubeSearchService } from "./you-tube-search.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';


@Component({
    selector: 'app-search-box',
    template: `
        <input type="text" class="form-control" placeholder="Search" autofocus>
    `
})

export class SearchBoxComponent implements OnInit {
    @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

    constructor(private youtube: YouTubeSearchService, private el: ElementRef) {

    }

    ngOnInit() {

        // keyup 이벤트를 관찰가능 스트림으로 전환
        Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map((e: any) => e.target.value) //입력값을 추출
            .filter((text: string) => text.length > 1)
            .debounceTime(250)
            .do(() => this.loading.next(true)) //loading EventEmitter에 true를 배출한다는 뜻
            .map((query: string) => this.youtube.search(query))
            .switch() //switch를 사용하면 기본적으로 최신검색 이외의 것은 모두 무시한다, 다시 말해, 새 검색이 들어오면 이전 것을 버린다.
            .subscribe(
                (results: SearchResult[]) => { // on sucesss
                    this.loading.emit(false);
                    this.results.emit(results);
                },
                (err: any) => { // on error
                    console.log(err);
                    this.loading.emit(false);
                },
                () => { // on completion
                    this.loading.emit(false);
                })
    }
}