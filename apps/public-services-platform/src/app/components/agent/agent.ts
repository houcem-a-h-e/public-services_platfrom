import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-agent.component',
  imports: [CommonModule,  MatCardModule,
    MatIconModule,],
  templateUrl: './agent.html',
  styleUrl: './agent.scss',
})
export class AgentComponent {}
