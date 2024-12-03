import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private apiUrl = BACKEND + "/api/contacto/";

  constructor(private http: HttpClient) { }

  getPreguntasFrecuentes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "preguntasFrecuentes");
  }

  enviarPregunta(formulario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "enviarPregunta", formulario);
  }
}
