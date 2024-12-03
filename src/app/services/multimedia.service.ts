import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  private apiUrl = BACKEND + "/api/eventos/";

  constructor(private http: HttpClient) { }

  /*getMultimediaByEventoId(id_evento: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "");
  }*/
}
