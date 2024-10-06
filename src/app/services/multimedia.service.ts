import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  private apiUrl = "http://localhost:5000/api/eventos/";

  constructor(private http: HttpClient) { }

  /*getMultimediaByEventoId(id_evento: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "");
  }*/
}
