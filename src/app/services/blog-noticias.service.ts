import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloBlog } from '../models/articuloBlog';
import { BACKEND } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class BlogNoticiasService {

  private apiUrl = "http://" + BACKEND + ":5000/api/blog/";

  constructor(private http: HttpClient) { }

  getArticulos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "articulos");
  }

  getArticulosPagina(page: number) {
    return this.http.get<any[]>(this.apiUrl + "articulosPagina/" + page);
  }

  getArticuloById(id: number): Observable<ArticuloBlog> {
    return this.http.get<ArticuloBlog>(this.apiUrl + "detallesArticulo/" + id);
  }
}
