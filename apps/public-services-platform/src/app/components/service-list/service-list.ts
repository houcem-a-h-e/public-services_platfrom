import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './service-list.html',
  styleUrls: ['./service-list.scss'],
})
export class ServiceListComponent implements OnInit {
  services: any[] = []; // Holds the original list of services
  filteredServices: any[] = []; // Holds the filtered list of services
  searchQuery: string = ''; // Tracks the search query
  editingService: any | null = null; // Tracks the service being edited

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.initializeServices();
  }

  /**
   * Initializes services by subscribing to the service BehaviorSubject.
   */
  initializeServices() {
    this.service.services$.subscribe((data) => {
      this.services = data;
      this.filteredServices = data; // Initialize filtered list with all services
    });
    this.service.getAll(); // Load services initially
  }

  /**
   * Filters the services based on the search query.
   */
  filterServices() {
    const query = this.searchQuery.toLowerCase();
    this.filteredServices = this.services.filter(
      (service) =>
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
    );
  }

  /**
   * Opens the form to edit a service.
   * @param service The service to be edited
   */
  editService(service: any) {
    this.editingService = { ...service }; // Clone the selected service to prevent direct mutation
  }

  /**
   * Saves the changes to the selected service and updates the local data.
   */
  saveService() {
    if (!this.editingService) return;

    this.service
      .update(this.editingService.id, this.editingService)
      .pipe(
        tap((data) => {
          this.editingService = null; // Close the edit form
        }),
        catchError((error) => {
          console.error('Error updating service:', error);
          return of(null); // Return fallback observable to keep the stream alive
        })
      )
      .subscribe();
  }

  /**
   * Cancels the edit operation and closes the form.
   */
  cancelEdit() {
    this.editingService = null;
  }

  /**
   * Deletes a service and updates the local data.
   * @param service The service to be deleted
   */
  deleteService(service: any) {
    this.service
      .delete(service.id)
      .pipe(
        tap(() => {
          // Update the local services list by filtering out the deleted service
          this.services = this.services.filter((s) => s.id !== service.id);
          this.filterServices(); // Update filtered services
        }),
        catchError((error) => {
          console.error('Error deleting service:', error);
          return of(null); // Handle the error gracefully
        })
      )
      .subscribe();
  }
}
