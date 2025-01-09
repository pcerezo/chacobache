import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const isTokenExpired = this.isTokenExpired(token);
        if (!isTokenExpired) {
          console.log("Token is not expired");
          return true;
        }
        else {
          console.log("Token is expired");
          localStorage.removeItem('token');
        }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000; // Convertir a milisegundos
      const currentDate = new Date().getTime();
      return currentDate > expirationDate;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }
}
