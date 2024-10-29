import { CommonModule } from '@angular/common';
import { Component , OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss'
})
export class ZoneComponent implements OnInit{
  constructor(private dataService: DataService) {}
  data: any[] = []; 
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getZone().subscribe(response => {
      this.data = response;
    });
  }
}
