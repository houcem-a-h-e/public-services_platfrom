// service-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss'
})
export class ServiceListComponent {
  services = [
    { id: 1, name: 'Water Supply', description: 'Water services', category: 'Utilities', status: 'active' },

  ];
}
