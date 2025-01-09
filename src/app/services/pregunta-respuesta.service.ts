import { Injectable } from '@angular/core';
import { BACKEND } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntaRespuestaService {
  
  private apiUrl = BACKEND + "/api/preguntaRespuesta/";

  constructor(private http: HttpClient) { }

  addPreguntaRespuesta(preguntaRespuesta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "crear", preguntaRespuesta);
  }

  editPreguntaRespuesta(preguntaRespuesta: any): Observable<any> {
    console.log("id: " + preguntaRespuesta.id);
    return this.http.put<any>(this.apiUrl + "actualizar/" + preguntaRespuesta.id, preguntaRespuesta);
  }

  deletePreguntaRespuesta(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "eliminar/" + id);
  }

  getPreguntasRespuestas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "getAll");
  }
}
