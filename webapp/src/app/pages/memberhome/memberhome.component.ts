import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-memberhome',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule, MatToolbarModule, RouterModule, CommonModule],
  templateUrl: './memberhome.component.html',
  styleUrl: './memberhome.component.scss'
})
export class MemberhomeComponent {
  sidebarVisible = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  isMobile(): boolean {
  return window.innerWidth <= 630; // เช็คว่าขนาดหน้าจอเล็กกว่าหรือเท่ากับ 630px หรือไม่
}

}
