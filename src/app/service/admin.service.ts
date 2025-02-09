import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  async getAllUsers() {
    try {
      const response = await axios.get('http://localhost:5000/admin/users');
      return response.data; // Returns a list of users
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async deleteUser(userId: string) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/user/${userId}`
      );
      return response.data; // Returns delete status
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  simulateApiDelay() {
    return new Promise((resolve) => setTimeout(resolve, 3000)); // 3 seconds delay
  }
}
