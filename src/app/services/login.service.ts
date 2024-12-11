import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND } from '../app.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = BACKEND + "/api/login/";
  private loginError: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.http.post<{ token: string }>(this.apiUrl, { username:username, password:password }).subscribe({
      next: (response) => {
        // Guardar el token en el almacenamiento local
        localStorage.setItem('token', response.token);
  
        // Redirigir a la página de administración
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        // Manejar errores
        localStorage.setItem('token', '');
        console.error("Error: credenciales incorrectas. " + err);
      }
    });
  }
}
