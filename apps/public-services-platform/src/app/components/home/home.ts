import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router'; // Don't forget RouterLink for buttons

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink // Required for routerLink on buttons
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  // Any component logic for the home page can go here
}
