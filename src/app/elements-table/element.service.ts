import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { PeriodicElement } from './periodic-element';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private http: HttpClient = inject(HttpClient);
  private url: string = "element-data.json";
  constructor() { }

  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.url)
      .pipe( map( (elements) => {
        var i = 0;
        return elements.map( (element) => {return { ... element, id: i++} } )
      }) );
  }

  getElementsByQuery( query: string ): Observable<PeriodicElement[]> {
    return this.getElements()
      .pipe( map( elements => elements
        .filter( element => element.name.includes( query ) ) ) );
  }
}
