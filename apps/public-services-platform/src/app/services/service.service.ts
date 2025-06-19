import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Service } from '@public-services-platform/models';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private endpoint = 'services';
  private servicesSubject = new BehaviorSubject<Service[]>([]);
  services$ = this.servicesSubject.asObservable();

  constructor(private api: ApiService) {}

  getAll(): void {
    this.api.get<Service[]>(`${this.endpoint}/all`).subscribe(
      (services) => this.servicesSubject.next(services),
      (error) => console.error('Error fetching services:', error)
    );
  }

  get(id: number) {
    return this.api.get<Service>(`${this.endpoint}/${id}`);
  }

  create(service: Partial<Service>) {
    return this.api.post<Service>(this.endpoint, service).pipe(
      tap((newService) => {
        const currentServices = this.servicesSubject.value;
        this.servicesSubject.next([...currentServices, newService]);
      })
    );
  }

  update(id: number, service: Partial<Service>) {
    return this.api.put<Service>(`${this.endpoint}/${id}`, service).pipe(
      tap((updatedService) => {
        const currentServices = this.servicesSubject.value.map((s) =>
          s.id === updatedService.id ? updatedService : s
        );
        this.servicesSubject.next(currentServices);
      })
    );
  }

  delete(id: number) {
    return this.api.delete<void>(`${this.endpoint}/${id}`).pipe(
      tap(() => {
        const currentServices = this.servicesSubject.value.filter(
          (s) => s.id !== id
        );
        this.servicesSubject.next(currentServices);
      })
    );
  }
}
