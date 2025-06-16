// service-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatLineModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatLineModule, MatButtonModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss'
})
export class ServiceListComponent {
  services = [
    { id: 1, name: 'Water Supply', description: 'Water services', category: 'Utilities', status: 'active' },

  ];
}
