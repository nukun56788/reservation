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
  selector: 'app-booth',
  standalone: true,
  imports: [RouterModule, HttpClientModule, LayoutComponent, MatListModule, CommonModule, MatDialogModule, FormsModule, RouterOutlet],
  templateUrl: './booth.component.html',
  styleUrl: './booth.component.scss'
})
export class BoothComponent implements OnInit{
  data: any[] = [];  
  currentData: any = { 
    booth_name: '', 
    booth_size: '', 
    booth_products: '', 
    price: '', 
    zone_id: '', 
  };
  editMode: boolean = false; 
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getBooth().subscribe(response => {
      this.data = response;
    });
  }


  onSubmit(): void {
    if (this.editMode && this.currentData.booth_id) {
      // แก้ไขข้อมูลตาม zone_id
      this.dataService.updateBooth(this.currentData.booth_id, this.currentData).subscribe(() => {
        this.loadData();
        this.resetForm();
        alert('แก้ไขบูธเรียบร้อยแล้ว');
      });
    } else {
      // เพิ่มข้อมูลใหม่
      this.dataService.addBooth(this.currentData).subscribe(() => {
        this.loadData();
        this.resetForm();
        alert('เพิ่มบูธเรียบร้อยแล้ว');
      });
    }
  }

  editBooth(item: any): void {
    this.editMode = true;
    this.currentData = { ...item }; // คัดลอกข้อมูลทั้งหมดเข้าสู่ฟอร์มเพื่อแก้ไข
  }

  deleteBooth(booth_name: string): void {
    this.dataService.deleteBooth(booth_name).subscribe(() => {
      this.loadData();
      alert('บูธถูกลบเรียบร้อยแล้ว');
    });
  }

  resetForm(): void {
    this.currentData = {  
      booth_name: '', 
      booth_size: '', 
      booth_products: '', 
      price: '', 
      zone_id: '', 
      
    };
    this.editMode = false;
  }
}
