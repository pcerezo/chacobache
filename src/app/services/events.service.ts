import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = "http://" + BACKEND + ":5000/api/eventos/";

  constructor(private http: HttpClient) { }

  getEventosFuturos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "historialEventosFuturos");
  }

  getEventosPasados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "historialEventosPasados");
  }

  getEventosPasadosConMultimedia(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "historialEventosPasadosMultimedia")
  }

  enviarEmailProduccion(formulario: any): Observable<any> {
    return this.http.post<any[]>(this.apiUrl + "solicitudProduccionMusical", formulario);
  }
}
