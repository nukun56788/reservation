import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { RouterOutlet, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [DashboardComponent, RouterOutlet, HttpClientModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
