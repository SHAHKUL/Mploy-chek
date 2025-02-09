import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  data: any[] = [];
  constructor() {
    this.getPosts();
  }

  async getPosts() {
    try {
      const res = await axios.get('http://localhost:5000/user/allData/');
      this.data = res.data.user;
    } catch (error) {
      console.log(error);
    }
  }
  async editItem(item: any) {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to change the role of this item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, change it!!!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true, 
      });
      if (result.isConfirmed) {
        const res = await axios.put(`http://localhost:5000/user/updateRole/${item._id}`, { role: item.role });
        Swal.fire({
          icon: 'success',
          title: 'Success!!!',
          text: res.data.message,
        });

        this.getPosts();
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Cancelled',
          text: 'No changes were made.',
        });
      }
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  
  }
  async deleteItem(item: any) {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Once Deleted Cannot be undone!!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!!!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true, 
      });
  
      if (result.isConfirmed) {
        const res = await axios.delete(`http://localhost:5000/user/remove/${item._id}`);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!!!',
          text: res.data.message,
        });
        this.getPosts();
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Cancelled',
          text: 'The item was not deleted.',
        });
      }
    } catch (error) {
      console.log('Error deleting item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!!!',
        text: 'There was an error deleting the item. Please try again.',
      });
    }
  }
  
}
