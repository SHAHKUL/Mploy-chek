import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string = '';
  private role: string = '';

  constructor() {}
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // Method to set the username
  setUsername(name: string): void {
    this.username = name;
    if (this.isBrowser()) {
      localStorage.setItem('username', name); // Only use localStorage in the browser
    }
  }

  // Method to get the username
  getUsername(): string {
    if (this.isBrowser()) {
      return localStorage.getItem('username') || '';
    }
    return this.username; 
  }

   // Method to set the username
   setRole(name: string): void {
    this.role = name;
    if (this.isBrowser()) {
      localStorage.setItem('role', name); // Only use localStorage in the browser
    }
  }

  // Method to get the username
  getRole(): string {
    if (this.isBrowser()) {
      return localStorage.getItem('role') || '';
    }
    return this.role; // Return the in-memory username if not in browser
  }

  // Handle the async call for user login
  async loginUser(data: any) {
    try {
      const response = await axios.post('http://localhost:5000/user/login', data);
      return response.data;  // Return the response message and any other data
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  }

  // Async function to manage user profile, etc. (could be extended)
  async getUserProfile(userId: string) {
    try {
      const response = await axios.get(`http://localhost:5000/user/profile/${userId}`);
      return response.data;  // Return user profile data
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  // A mock function to simulate API delay
  simulateApiDelay() {
    return new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
  }
}
