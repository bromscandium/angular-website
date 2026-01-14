import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeTheme } from './store/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit(): void {
    initializeTheme();
  }
}
