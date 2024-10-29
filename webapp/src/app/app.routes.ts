import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventComponent } from './pages/event/event.component';
import { BoothComponent } from './pages/booth/booth.component';
import { MemberhomeComponent } from './pages/memberhome/memberhome.component';
import { ZoneComponent } from './pages/zone/zone.component';


export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path:'login', component:LoginComponent
    },
    {
        path:'register', component:LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: 'zone', component: DashboardComponent },
          { path: 'event', component: EventComponent },
          { path: 'booth', component: BoothComponent },
          { path: '', redirectTo: 'event', pathMatch: 'full' } // Redirect to dashboard by default
        ]
      },
      {
        path: '',
        component: MemberhomeComponent,
        children: [
          { path: 'home', component:  ZoneComponent},
          // { path: 'bootmember', component: BoothComponent },
          // { path: 'booth', component: BoothComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
      }
];
