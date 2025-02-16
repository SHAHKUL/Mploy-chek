import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string = '';
  private role: string = '';

  constructor() {}


  async loginUser(data: any) {
    try {
      const response = await axios.post(
        'http://localhost:5000/user/login',
        data
      );
      return response.data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  }

  async getUserProfile(userId: string) {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/profile/${userId}`
      );
      return response.data; // Return user profile data
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  simulateApiDelay() {
    return new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
  }
}
