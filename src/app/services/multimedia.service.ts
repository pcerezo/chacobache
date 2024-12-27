import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  private apiUrl = BACKEND + "/api/multimedia/";

  constructor(private http: HttpClient) { }

  getMultimediaByEventoId(id_evento: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "getMultimediaByEvento/" + id_evento);
  }

  getMultimediaById(id:number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "getMultimediaById/" + id);
  }

  eliminarMultimedia(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "eliminarMultimedia/" + id);
  }

  crearMultimedia(multimedia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "crearMultimedia", multimedia);
  }

  actualizarMultimedia(id: number, multimedia: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "editarMultimedia", multimedia);
  }
}
