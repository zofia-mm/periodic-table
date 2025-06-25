import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from './periodic-element';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private http: HttpClient = inject(HttpClient);
  private url: string = "element-data.json";
  constructor() { }

  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.url);
  }
}
