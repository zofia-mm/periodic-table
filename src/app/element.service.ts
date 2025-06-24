import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PeriodicElement } from './periodic-element';
import { Observable } from 'rxjs';

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
