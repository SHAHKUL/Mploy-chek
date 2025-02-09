import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() {}

  // Method to get all users for admin
  async getAllUsers() {
    try {
      const response = await axios.get('http://localhost:5000/admin/users');
      return response.data;  // Returns a list of users
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Method to delete a user
  async deleteUser(userId: string) {
    try {
      const response = await axios.delete(`http://localhost:5000/admin/user/${userId}`);
      return response.data;  // Returns delete status
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Method to manage API delay for admin-related tasks
  simulateApiDelay() {
    return new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds delay
  }

  // Other admin functionality can be added here
}
