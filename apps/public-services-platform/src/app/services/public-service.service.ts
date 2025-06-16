import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PublicService } from '../../../../../libs/models/src/lib/public-service.model'; 

@Injectable({
  providedIn: 'root',
})
export class PublicServiceService {
  private services: PublicService[] = [
    { id: 1, name: 'Water Supply', description: 'Water services', category: 'Utilities', status: 'active' },
    { id: 2, name: 'Electricity', description: 'Electricity services', category: 'Utilities', status: 'active' },
  ];

  getServices(): Observable<PublicService[]> {
    return of(this.services);
  }

  addService(service: PublicService): Observable<PublicService> {
    service.id = this.services.length + 1;
    this.services.push(service);
    return of(service);
  }
}
