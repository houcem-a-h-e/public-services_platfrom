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
import { ServiceService } from '../../services/service.service';
import { catchError, of } from 'rxjs';

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

  constructor(private serviceService: PublicServiceService,
              private router: Router,
              private apiService : ServiceService) {}


  addService(){
    this.apiService.create(this.service).pipe(
          catchError(err => {
            console.error('Error loading services', err);
            return of(); 
          })
        ).subscribe(data => {
            this.router.navigate(['/services']); // Navigate to the service list after creation
        });  
  }
}
