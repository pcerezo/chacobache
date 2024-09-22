import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { IntegrantesComponent } from './components/integrantes/integrantes.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    {path: 'integrantes', component: IntegrantesComponent},
    { path: '**', redirectTo: '/inicio' }
];
