import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-home',
  imports: [NavbarComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username?: string;

  ngOnInit(): void {
    // Safe check to ensure we're in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      this.username = localStorage.getItem('username') || ''; // Retrieve username from localStorage
     
    }
  }

}
