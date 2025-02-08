import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import axios from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [NavbarComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  data:any[]=[]
  constructor() {
    this.getPosts();
  }
  

  async getPosts() {
    try {
      const res = await axios.get('http://localhost:5000/user/allData/');
      console.log(res.data.user)
      this.data=res.data.user
    } catch (error) {
      console.log(error);
    }
  }
}
