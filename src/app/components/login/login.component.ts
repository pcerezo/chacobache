import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private loginService: LoginService) {
    // Crear el formulario con validaciones
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Llamar al backend para autenticar
      this.loginService.login(username, password);

      if (localStorage.getItem('token') == '') {
        this.loginError = "Error: credenciales incorrectas";
      }
    }
  }
}
