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
        reverseButtons: true, // To reverse button order (confirm on the left, cancel on the right)
      });
  
      if (result.isConfirmed) {
        // Proceed with the role update if confirmed
        const res = await axios.put(`http://localhost:5000/user/updateRole/${item._id}`, { role: item.role });
  
        // Show success SweetAlert if the update is successful
        Swal.fire({
          icon: 'success',
          title: 'Success!!!',
          text: res.data.message,
        });
  
        // Refresh the data after the update
        this.getPosts();
      } else {
        // Show info SweetAlert if the user cancels the action
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
      // Show a confirmation dialog before proceeding with the deletion
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Once Deleted Cannot be undone!!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!!!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true, // Reverse button order (confirm on the left)
      });
  
      if (result.isConfirmed) {
        // Proceed with the delete request if confirmed
        const res = await axios.delete(`http://localhost:5000/user/remove/${item._id}`);
  
        // Show success SweetAlert if the delete is successful
        Swal.fire({
          icon: 'success',
          title: 'Deleted!!!',
          text: res.data.message,
        });
  
        // Remove the deleted item from the local data array
        this.data = this.data.filter((dataItem) => dataItem._id !== item._id);
      } else {
        // Show info SweetAlert if the user cancels the deletion
        Swal.fire({
          icon: 'info',
          title: 'Cancelled',
          text: 'The item was not deleted.',
        });
      }
    } catch (error) {
      console.log('Error deleting item:', error);
  
      // Show an error SweetAlert if something goes wrong during the delete process
      Swal.fire({
        icon: 'error',
        title: 'Error!!!',
        text: 'There was an error deleting the item. Please try again.',
      });
    }
  }
  
}
