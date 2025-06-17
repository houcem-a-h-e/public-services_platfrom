import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '@public-services-platform/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private baseUrl = 'http://localhost:3000/api/services'; // Adjust API URL accordingly

  private servicesSubject = new BehaviorSubject<Service[]>([]); // BehaviorSubject to hold service data
  services$ = this.servicesSubject.asObservable(); // Observable for components to subscribe to

  constructor(private http: HttpClient) {}

  /**
   * Fetches all services from the API and updates the BehaviorSubject.
   */
  getAll(): void {
    this.http.get<Service[]>(`${this.baseUrl}/all`).subscribe(
      (services) => this.servicesSubject.next(services),
      (error) => console.error('Error fetching services:', error)
    );
  }

  test():void{
    this.http.get<Service[]>(`${this.baseUrl}/test`).subscribe(
      (services) => {
        this.servicesSubject.next(services)},
      (error) => console.error('Error fetching services:', error)
    );
  }
  /**
   * Fetches a single service by ID.
   * @param id - The ID of the service to fetch
   * @returns Observable of the service
   */
  get(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/${id}`);
  }

  /**
   * Creates a new service and updates the local data.
   * @param service - The service to create
   * @returns Observable of the created service
   */
  create(service: Partial<Service>): Observable<Service> {
    return this.http.post<Service>(this.baseUrl, service).pipe(
      tap((newService) => {
        const currentServices = this.servicesSubject.value;
        this.servicesSubject.next([...currentServices, newService]);
      })
    );
  }

  /**
   * Updates an existing service and updates the local data.
   * @param id - The ID of the service to update
   * @param service - The updated service data
   * @returns Observable of the updated service
   */
  update(id: number, service: Partial<Service>): Observable<Service> {
    return this.http.put<Service>(`${this.baseUrl}/${id}`, service).pipe(
      tap((updatedService) => {
        const currentServices = this.servicesSubject.value.map((s) =>
          s.id === updatedService.id ? updatedService : s
        );
        this.servicesSubject.next(currentServices);
      })
    );
  }

  /**
   * Deletes a service and updates the local data.
   * @param id - The ID of the service to delete
   * @returns Observable for the delete operation
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const currentServices = this.servicesSubject.value.filter(
          (s) => s.id !== id
        );
        this.servicesSubject.next(currentServices);
      })
    );
  }
}
