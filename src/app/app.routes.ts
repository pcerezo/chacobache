import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { IntegrantesComponent } from './components/integrantes/integrantes.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'integrantes', component: IntegrantesComponent},
    
    {path: '**', component: InicioComponent}
];
