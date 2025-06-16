import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PublicService } from '@public-services-platform/models';
import { PublicServiceService } from '../../services/public-service.service';

@Component({
  selector: 'app-service-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './service-create.html',
  styleUrls: ['./service-create.scss'],
})
export class ServiceCreateComponent {
  service: Partial<PublicService> = {
    name: '',
    description: '',
    category: '',
    status: 'active'
  };

  constructor(private serviceService: PublicServiceService, private router: Router) {}

  save() {
    if (this.service.name && this.service.description && this.service.category) {
      this.serviceService.addService(this.service as PublicService).subscribe(() => {
        this.router.navigate(['/services']);
      });
    }
  }
}
