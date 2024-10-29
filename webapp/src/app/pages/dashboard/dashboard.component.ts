import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import {MatListModule,MatListOption} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, HttpClientModule, LayoutComponent, MatListModule, CommonModule, MatDialogModule, FormsModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  data: any[] = [];  
  // user: any[] = []; 
  currentData: any = { 
    zone_name: '', 
    zone_info: '', 
    number_of_booths: 0,
  };
  editMode: boolean = false; 
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getZone().subscribe(response => {
      this.data = response;
    });
  }


  onSubmit(): void {
    if (this.editMode && this.currentData.zone_id) {
      // แก้ไขข้อมูลตาม zone_id
      this.dataService.updateZone(this.currentData.zone_id, this.currentData).subscribe(() => {
        this.loadData();
        this.resetForm();
      });
    } else {
      // เพิ่มข้อมูลใหม่
      this.dataService.addZone(this.currentData).subscribe(() => {
        this.loadData();
        this.resetForm();
      });
    }
  }

  editZone(item: any): void {
    this.editMode = true;
    this.currentData = { ...item }; // คัดลอกข้อมูลทั้งหมดเข้าสู่ฟอร์มเพื่อแก้ไข
  }

  deleteZone(zone_name: string): void {
    this.dataService.deleteZone(zone_name).subscribe(() => {
      this.loadData();
    });
  }

  resetForm(): void {
    this.currentData = {  
      zone_name: '', 
      zone_info: '', 
      number_of_booths: 0,
    };
    this.editMode = false;
  }
}
