import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <h1>Services</h1>
    <button (click)="getProtectedData()">Get Protected Data</button>
    <p>{{ data }}</p>
  `
})
export class ServicesComponent {
  data = '';

  constructor(private http: HttpClient) {}

  getProtectedData() {
    this.http.get<string>('http://localhost:3000/api/protected').subscribe({
      next: (response) => (this.data = response),
      error: (err) => (this.data = `Error: ${err.message}`)
    });
  }
}