import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { IntegrantesComponent } from './components/integrantes/integrantes.component';
import { EventsComponent } from './components/events/events.component';
import { ConciertosVivoComponent } from './components/conciertos-vivo/conciertos-vivo.component';
import { OtrasProduccionesComponent } from './components/otras-producciones/otras-producciones.component';
import { BlogNoticiasComponent } from './components/blog-noticias/blog-noticias.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DetallesBlogComponent } from './components/detalles-blog/detalles-blog.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: '', redirectTo: '/inicio', pathMatch: 'full' },
    {path: 'integrantes', component: IntegrantesComponent},
    {path: 'eventos', component: EventsComponent},
    {path: 'conciertosEnVivo', component: ConciertosVivoComponent},
    {path: 'otrasProducciones', component: OtrasProduccionesComponent},
    {path: 'blogNoticias', component: BlogNoticiasComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'blogNoticias/detalles/:id', component: DetallesBlogComponent},
    {path: '**', redirectTo: '/inicio' }
];
