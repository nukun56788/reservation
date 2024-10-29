import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule,  RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import {MatListModule,MatListOption} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-event',
  standalone: true,
  imports: [RouterModule, HttpClientModule, LayoutComponent, MatListModule, CommonModule, MatDialogModule, FormsModule, RouterOutlet],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit{
  data: any[] = [];  
  // user: any[] = []; 
  currentData: any = { 
    event_name: '', 
    date: '', 
    date_end: ''
  };
  editMode: boolean = false; 
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getEvent().subscribe(response => {
      this.data = response;
    });
  }


  // onSubmit(): void {
  //   if (this.editMode && this.currentData.event_id) {
  //     // แก้ไขข้อมูลตาม zone_id
  //     this.dataService.updateEvent(this.currentData.event_id, this.currentData).subscribe(() => {
  //       this.loadData();
  //       this.resetForm();
  //     });
  //   } else {
  //     // เพิ่มข้อมูลใหม่
  //     this.dataService.addEvent(this.currentData).subscribe(() => {
  //       this.loadData();
  //       this.resetForm();
  //     });
  //   }
  // }

  onSubmit(): void {
    // แปลงรูปแบบวันที่ก่อนส่ง
    const formattedData = {
      ...this.currentData,
      date: this.formatDate(this.currentData.date),
      date_end: this.formatDate(this.currentData.date_end)
    };
  
    if (this.editMode && this.currentData.event_id) {
      // แก้ไขข้อมูล
      this.dataService.updateEvent(this.currentData.event_id, formattedData).subscribe(() => {
        this.loadData();
        this.resetForm();
      });
    } else {
      // เพิ่มข้อมูลใหม่
      this.dataService.addEvent(formattedData).subscribe(() => {
        this.loadData();
        this.resetForm();
      });
    }
  }
  
  // ฟังก์ชันสำหรับแปลงรูปแบบวันที่เป็น DD/MM/YYYY
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  

  editEvent(item: any): void {
    this.editMode = true;
    this.currentData = { ...item }; // คัดลอกข้อมูลทั้งหมดเข้าสู่ฟอร์มเพื่อแก้ไข
  }


  resetForm(): void {
    this.currentData = {  
      event_name: '', 
      date: '', 
      date_end: '',
    };
    this.editMode = false;
  }
}
